#!/usr/bin/env nodejs

var express = require('express')
var app = express()
var request = require('request')  // To make HTTP requests at the server side

var server = require('http').Server(app)
var io = require('socket.io')(server);

var helmet = require('helmet')  // To change response headers

var path = require('path')

const argv = require('minimist')(process.argv.slice(2))
const isDev = process.env.NODE_ENV !== 'production'

// Get the intended port number, use port 8000 if not provided
const port = argv.port || process.env.PORT || 8080
server.listen(port, (err) => {
  if (err) {
    return console.log(err.message)
  }
})
if (isDev) {
  console.log(port, 'http://localhost')
} else {
  console.log(port)
}

// Apply security middlewares
app.use(helmet())

// Remove x-powered-by header
app.disable('x-powered-by')

// server static files
app.use('/static', express.static('client'))

// Load main web page
app.get('/', function (req, res) {
  res.sendFile(path.resolve('client/index.html'))
})

var allClients = [];

// When a socket connection is created
io.on('connection', function (socket) {
  allClients.push(socket);
  socket.on('disconnect', function() {
     console.log('Got disconnect!');
     var i = allClients.indexOf(socket);
     allClients.splice(i, 1);
  });
  socket.on('error', function(){
    console.error('Got errored!')
  })
});

// Function to react to a new PR

function sendLove (data) {
  var options = {
    url: `https://api.github.com/repos/${data.repo_name}/issues/${data.pull_id}/reactions`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
      'Authorization': 'token ' + process.env.GITHUB_OAUTH_KEY,
      'Accept': 'application/vnd.github.squirrel-girl-preview'
    },
    json: {
      content: 'heart'
    }
  }
  request.post(options, function (error, response, body) {
    console.log(response.statusCode)
    if (!error && response.statusCode === 200) {
      console.log('heart', 'done')
            starRepository(data)
            notifyClients('heart', data)
    } else {
      console.error('GitHub issue', response.statusCode)
    }
  })
}

function notifyClients(action, data){
  allClients.forEach(function(socket){
        if(socket != null && socket.connected == true){         
                console.log('notified')
                socket.volatile.json.emit('github', {action, data});
            }else{
              console.error(err.message);
            }
      });
}

function starRepository (data) {
  console.log('star', data)
  var options = {
    url: `https://api.github.com/user/starred/${data.repo_name}`,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
      'Authorization': 'token ' + process.env.GITHUB_OAUTH_KEY,
      'Content-Length':0
    }
  }
  request.put(options, function (error, response, body) {
    if (!error && response.statusCode === 204) {
      console.log('starred', 'done')
      notifyClients('starred', data)
    } else {
      console.error('GitHub issue', response.body)
    }
  })
}

// Function to get events from GitHub API
function fetchDataFromGithub () {
  var options = {
    url: 'https://api.github.com/events',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
      'Authorization': 'token ' + process.env.GITHUB_OAUTH_KEY
    }
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body)
      stripData(data)  // Keep only useful keys
    } else {
      console.error('GitHub status code: ' + response.statusCode)
    }
  })
  setTimeout(fetchDataFromGithub, 2000)
}
setTimeout(fetchDataFromGithub, 2000)

function stripData (data) {
  data.forEach(function (data) {
    if (data.type === 'PullRequestEvent' && data.payload.action ==='opened') {
      console.log('url', data.payload.pull_request.html_url)
      const stripedData = {
        'id': data.id,
        'pull_id': data.payload.number,
        'type': data.type,
        'user': data.actor.display_login,
        'user_avatar': data.actor.avatar_url + 'v=3&s=64',
        'repo_id': data.repo.id,
        'repo_name': data.repo.name,
        'action': data.payload.action,  // opened, reopened, closed, merged
        'message': data.payload.pull_request.title,
        'created': data.created_at,
        'url': data.payload.pull_request.html_url
      }

      sendLove(stripedData)
    }
  })
}
