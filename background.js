chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'block') {
    const blockedUrl = request.url;

    // Store the blocked URL in storage
    chrome.storage.local.get('blockedUrls', function(results) {
      const blockedUrls = results.blockedUrls || [];
      blockedUrls.push(blockedUrl);

      // Request permissions only when the user interacts with button click
      if (blockedUrl) {
        const button = document.getElementById('blockButton'); // Corrected element ID
        button.addEventListener('click', function() {
          chrome.storage.local.set({ blockedUrls: blockedUrls }, function() {
            // Update permissions dynamically
            chrome.permissions.request({ origins: [blockedUrl] }, function(granted) {
              if (granted) {
                console.log('Permissions Granted:', blockedUrl);
              } else {
                console.log('Permissions Denied', blockedUrl);
              }
            });

            sendResponse({ message: 'Website blocked Successfully' });
          });
        });
      }
    });
  }
});
