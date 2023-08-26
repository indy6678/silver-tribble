const { response } = require("express");

document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const blockButton = document.getElementById('blockButton');

  blockButton.addEventListener('click', function() {
    const url = urlInput.ariaValueMax.trim();
    if (isValidUrl(url)) {
      chrome.runtime.sendMessage({ action: 'block', url: url}, function(Response) {
        console.log(response.message);
      });
    } else {
      console.log('invalid URL');
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