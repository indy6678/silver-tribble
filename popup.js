document.addEventListener('DOMContentLoaded', function() {
  const blockButton = document.getElementById('blockButton');
  blockButton.addEventListener('click', blockWebsite);
});

function blockWebsite() {
const websiteUrl = document.getElementById('websiteUrl').value;
chrome.runtime.sendMessage({ action: 'block', url: websiteUrl});
}
