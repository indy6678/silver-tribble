document.addEventListener('DOMContentLoaded', function() {
  const blockButton = document.getElementById('blockButton');
  
  blockButton.addEventListener('click', function() {
    // This code is executed in response to a user's click event
    // Call the function that requires a user gesture
    performBlockingAction();
  });
});

function performBlockingAction() {
  // Perform the action that requires a user gesture
  // For example, making a request to block a URL
  chrome.runtime.sendMessage({ action: 'block', url: 'https://www.iamlilbaby.com/' });
}





/*document.addEventListener('DOMContentLoaded', function() {
  const blockButton = document.getElementById('blockButton');
  blockButton.addEventListener('click', blockWebsite);
});

function blockWebsite() {
  const websiteUrl = document.getElementById('websiteUrl').value;
  chrome.runtime.sendMessage({ action: 'block', url: websiteUrl });
}*/