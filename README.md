# Status - Offline

@prhero is now turned off for the time being and may return with your advise of being opt-in only.


# What is @prhero?

@prhero is a GitHub experiment designed with good intentions to spread a little ❤️ . During the last 5 hours, it has given ❤️  to over 1.8k public repos.

# Why is it reacting to every PR with a ❤️?

I've seen PRs that people have poured their time and effort into public repos and open source projects, only for it to be ignored or rejected. The intention behind @prhero was supposed to be harmless fun to make people smile, the idea being that somebody out there cares about your hard work.

# But why a ❤️?

@prhero was originally planned to 👍 instead but a ❤️ seemed more harmless and appropriate for the bot. As mentioned above, the sole intention was to spread a little ❤️ and make people smile. PRs don't tend to get anything other than a 👍 

# But it's reacting to all my private PRs!

Actually, @prhero only has access to publicly available repos, which means @prhero can't react to private repos. If your repository is meant to be private, you should think about doing so.

# Isn't this abusing, aggressive and noise? 

A reaction such as this is supposed to be harmless. A few of you have suggested that it's actions are aggressive or abusive, and adds a lot of noise to the platform. I feel that this definitely misinterprets the intentions of @prhero.

Abuse and aggression would suggest @prhero was designed with with bad intentions, but it's not stealing your data, or doing anything negative... unlike the bots on GitHub you don't know about. Reactions were created by GitHub to remove the noise of 👍 comments.

You also don't get notifications when someone reacts to your PR or stars your repo, so there's nothing abusive about it. Were you to get notifications, then absolutely this would be abuse and aggressive.

If it was to comment on every PR instead, that would be abusive.

# But it adds no meaning to the PR discussion

What is love? (Baby don't hurt me, don't hurt me no more). See everything I've said above.

# How does it work?

It's a Node.js server that's polling the GitHub Events API and filtering **opened** pull requests. It then makes a subsequent call to each PR to add a ❤️. It adheres to the rate limit, so it doesn't abuse the API.

# Isn't this against the terms of GitHub?

While @JasonLG1979 has pointed out above that an account must be human, the second line defines that as _Accounts registered by "bots" or other automated methods are not permitted_. As the @prhero account was created by me, it doesn't break that rule. However, the second point regarding "Abuse or excessive use of the API" _may_ apply, but it still adheres to the API rate-limit.

Also, a bot account is how most GitHub integrations work. (eg. @gitter-badger)

# How long was this supposed to last?

The intention was never to keep it constantly online for the foreseeable future. It was designed as a short-lived experiment that would last no longer than a week.

However some people have suggested both improvements as well as ways to make it more meaningful. I hear you, so it may come back online as an opt-in integration powered by web hooks.
