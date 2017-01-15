var socket = io();
socket.on('github', function (data) {
    console.log(data)
    let li = ''
    switch(data.action) {
        case 'heart': {
            li = $('<li>', {html:`<a href='${data.data.url}' target='_blank'>${data.data.url}</a>`})
            break;
        }
        default: {
            li = $('<li>', {text:`${data.data.repo_name} - ${data.action}`})
        }

    }
    
  $('#events').append(li);
});