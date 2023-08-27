document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const blockButton = document.getElementById('blockButton');

  blockButton.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (isValidUrl(url)) {
      chrome.runtime.sendMessage({ action: 'block', url: url }, function(response) {
        console.log(response.message);
      });
    }
  });
});

function isValidUrl(url) {
  return url.startsWith('http://') || url.startsWith('https://');
}




/*document.addEventListener('DOMContentLoaded', function() {
  const blockButton = document.getElementById('blockButton');
  blockButton.addEventListener('click', blockWebsite);
});

function blockWebsite() {
  const websiteUrl = document.getElementById('websiteUrl').value;
  chrome.runtime.sendMessage({ action: 'block', url: websiteUrl });
}*/