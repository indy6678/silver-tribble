chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'block') {
    const blockedUrl = request.url;

    // Store the blocked URL in storage
    chrome.storage.local.get('blockedUrls', function(result) {
      const blockedUrls = result.blockedUrls || [];
      blockedUrls.push(blockedUrl);

      chrome.storage.local.set({ blockedUrls: blockedUrls }, function() {
        // Update permissions dynamically
        chrome.permissions.request({ origins: [blockedUrl + '/*'] }, function(granted) {
          if (granted) {
            console.log('Permissions Granted:', blockedUrl);
          } else {
            console.log('Permissions Denied', blockedUrl);
          }
        });

        sendResponse({ message: 'URL blocked successfully' });
      });
    });
  }
});
