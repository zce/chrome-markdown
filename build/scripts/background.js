chrome.storage.local.get({enabled:!0},function(e){function o(e){return{path:"img/"+(e?"on":"off")+"-38.png"}}var n=e.enabled;chrome.browserAction.setIcon(o(n)),chrome.browserAction.onClicked.addListener(function(e){n=!n,chrome.storage.local.set({enabled:n},function(){chrome.browserAction.setIcon(o(n))})})});
//# sourceMappingURL=background.js.map
