// Define the isBlockedUrl function
function isBlockedUrl(url, callback) {
  chrome.storage.local.get('blockedUrls', function(result) {
    const blockedUrls = result.blockedUrls || [];

    // Check if the URL matches any blocked URL in the list
    const isBlocked = blockedUrls.some(blockedUrl => url.includes(blockedUrl));
    callback(isBlocked);
  });
}

// Add the listener to intercept and block requests
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    isBlockedUrl(details.url, function(isBlocked) {
      if (isBlocked) {
        return { cancel: true };
      }
    });
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (isBlockedUrl(details.url)) {
      return { cancel: true };
    }
  },
  { urls: ["<all_urls"] },
  ["blocking"]
);

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
