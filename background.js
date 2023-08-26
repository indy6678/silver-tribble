chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'block') {
    const blockedUrl = request.url;

    // Request permissions on button click
    chrome.permissions.request({ origins: [blockedUrl + '/*'] }, function(granted) {
      if (granted) {
        console.log('Permissions Granted:', blockedUrl);
        // Store the blocked URL in storage
        chrome.storage.local.get('blockedUrls', function(result) {
          const blockedUrls = result.blockedUrls || [];
          blockedUrls.push(blockedUrl);

          chrome.storage.local.set({ blockedUrls: blockedUrls }, function() {
            sendResponse({ message: 'URL blocked successfully' });
          });
        });
      } else {
        console.log('Permissions Denied', blockedUrl);
        sendResponse({ message: 'URL block permission denied' });
      }
    });
    
    // Return true to indicate that sendResponse will be used asynchronously
    return true;
  }
});
