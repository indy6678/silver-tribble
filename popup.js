document.addEventListener('DOMContentLoaded', function() {
  const blockButton = document.getElementById('blockButton');
  blockButton.addEventListener('click', blockWebsite);
});

function blockWebsite() {
  const blockedUrl = 'https://www.youtube.com/';
  chrome.runtime.sendMessage({ action: 'block', url: blockedUrl });
}
