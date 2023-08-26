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


function blockWebsite(blockedUrl) {
  // Get the current URL of the webpage
  const currentUrl = window.location.href;

  // Check if the current URL matches the blocked URL
  if (currentUrl.includes(blockedUrl)) {
    // Redirect the user to a different page (e.g., a blocked page)
    window.location.href = 'https://example.com/blocked-page';
  }
}

