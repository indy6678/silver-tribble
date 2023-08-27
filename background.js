chrome.declarativeNetRequest.updateDynamicRules({
  addRules: [{
    'id': 1001,
    'priority': 1,
    'action': {
      'type': 'block'
    },
    'condition': {
      'urlFilter': 'travisscott.com',
      'resourceTypes': [
        'csp_report', 'font', 'image', 'main_frame', 'media', 'object', 'other', 'ping', 'script',
        'stylesheet', 'sub_frame', 'webbundle', 'websocket', 'webtransport', 'xmlhttprequest'
      ]
    }
  }],
  removeRuleIds: [1001]
})
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

// Rest of your code...


// Add the listener to handle messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'block') {
    const blockedUrl = request.url;

    // Store the blocked URL in storage
    chrome.storage.local.get('blockedUrls', function(result) {
      const blockedUrls = result.blockedUrls || [];
      blockedUrls.push(blockedUrl);

      chrome.storage.local.set({ blockedUrls: blockedUrls }, function() {
        if (chrome.runtime.lastError) {
          console.error('Error saving to local storage:', chrome.runtime.lastError);
        } else {
          // Request permissions for the blocked URL
          chrome.permissions.request({ origins: [blockedUrl + '/*'] }, function(granted) {
            if (granted) {
              // Send message to content script to apply visual blocking
              chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                const activeTab = tabs[0];
                chrome.scripting.executeScript({
                  target: { tabId: activeTab.id },
                  function: function() {
                    // Send a message to the content script
                    chrome.runtime.sendMessage({ action: 'block' }, function(response) {
                      console.log(response.message);
                    });
                  }
                });
              });
            } else {
              console.log('Permissions Denied:', blockedUrl);
            }
          });
        }
      });
    });
  }
});
