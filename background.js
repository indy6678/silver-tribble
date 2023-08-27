// Define the blocked URL
const blockedUrl = 'https://www.iamlilbaby.com/';

// Add the listener to intercept and block requests
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.startsWith(blockedUrl)) {
      return { cancel: true };
    }
  },
  { urls: [blockedUrl + '*'] },
  ['blocking']
);

// Define the isBlockedUrl function
function isBlockedUrl(url, callback) {
  chrome.storage.local.get('blockedUrls', function(result) {
    const blockedUrls = result.blockedUrls || [];
    const isBlocked = blockedUrls.some(blockedUrl => url.includes(blockedUrl));
    callback(isBlocked);
  });
}

chrome.runtime.onInstalled.addListener(function() {
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
});
