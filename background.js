chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'block') {
    const blockedUrl = request.url;
    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        return { cancel: true };
      },
      { urls: [blockedUrl] },
      ['blocking']
    );
    sendResponse({ message: 'Website blocked successfully' });
  }
});

  