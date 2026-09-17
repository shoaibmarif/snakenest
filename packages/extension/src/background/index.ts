const LIVE_URL = 'https://snakenest.netlify.app/';

// Setup context menus on extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('[SnakeNest Extension] Installed successfully.');

  chrome.contextMenus.create({
    id: 'open-snake-nest',
    title: '🐍 Play Snake Game Online (Full Screen)',
    contexts: ['action', 'page']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'open-snake-nest') {
    chrome.tabs.create({ url: LIVE_URL });
  }
});

// Background runtime message listener
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'OPEN_TAB') {
    const url = message.url || LIVE_URL;
    chrome.tabs.create({ url });
    sendResponse({ success: true });
  }
  return true;
});
