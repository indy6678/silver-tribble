document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const blockButton = document.getElementById('blockButton');

  blockButton.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (isValidUrl(url)) {
      chrome.runtime.sendMessage({ action: 'block', url: url }, function(response) {
        console.log(response.message);
      });
    } else {
      console.log('Invalid URL');
    }
  });
});

function isValidUrl(url) {
  // Add your URL validation logic here
  return url.startsWith('http://') || url.startsWith('https://');
}
