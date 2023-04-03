---
title: How to fix "Receiving end does not exist" error.
description: Reasons for "uncaught (in promise) error. Could not establish connection. Receiving end does not exist." error.
---

Very popular error - every extension developer encounters this error lots of times. Sometimes it breaks things, sometimes it doesn't. Today will see what might be the reasons behind and how to fix it.

There are three main points what went wrong if you're facing this problem with your extensions:

## Not following the official API

Google writes pretty decent tutorials and explanations, so I won't be copywriting it. [This article](https://developer.chrome.com/docs/extensions/mv3/messaging/) explains how to establish the connection between different types of scripts properly. The hints:

- How to send a message ([sendMessage](https://developer.chrome.com/extensions/runtime#method-sendMessage)). [Live example](https://github.com/RomanistHere/PopUpOFF/blob/develop/content/setup.js#L130) in PopUpOFF content script.
- How to handle it - get and process ([onMessage](https://developer.chrome.com/extensions/runtime#event-onMessage)). Example from [background.js](https://github.com/RomanistHere/PopUpOFF/blob/develop/background/background.js#L180).
- Don't use _chrome.extension.sendRequest || .onRequest' or 'chrome.extension.sendMessage || .onMessage_ if you don't need to support the Chrome oldest versions. Most likely you don't.

You know it all already, and it still doesn't work?

## You must have messed scripts up

Make sure your background/content scripts are updated, loaded (reloaded) and available to each other at the very same moment you're trying to pass a message. Try incognito mode, disable all other extensions - that doesn't help? Give it a break. I always have some new ideas once I make a pause and rest a bit.

## It is working, but the error keeps randomly appearing?

Why didn't you tell so at the beginning?

Every time you update (reload) the dev version of your extension, Chrome - or whatever browser you use - _starts using the new version of your scripts - but it doesn't update old content scripts on already opened pages. So, technically, the browser is trying to reach the not injected (yet!) content script and throws an error because it couldn't do so_. But it can still work because your new script can be identical to the old one.

What to do then? Basically, you can track if an old connection is not needed and disable it or manually update your scripts. I've heard you can programmatically remove old content scripts, but it's kinda a complex task (you need to reconfigure some parts of your system) and I'm too lazy to try figuring it out, so for now you can search for it or just make sure to reload the page you interact with every time you upload a new extension version for test. If your content script in production is updating only with the extension itself, it should not be a problem.

Now you know why you're getting this error during the development and not in production.

[Original article](https://romanisthere.github.io/posts/receiving-end/) from my old website.
