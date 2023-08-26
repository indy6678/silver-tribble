// background.js
// This script will run in the background context

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'block') {
    const blockedUrl = request.url;

    // Send a message to the content script in the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: activeTab.id },
        function: blockWebsite,
      });
    });

    sendResponse({ message: 'Website block request sent' });
  }
});

function blockWebsite() {
  // Your content script logic here
}

