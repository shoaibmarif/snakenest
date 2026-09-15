import { slugify, fastHash, CORE_VERSION } from '@project/core';

// Setup context menus on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log(`[Extension Background] Installed with @project/core v${CORE_VERSION}`);

  chrome.contextMenus.create({
    id: 'slugify-selection',
    title: 'Generate Slug from Selection',
    contexts: ['selection']
  });

  chrome.contextMenus.create({
    id: 'hash-selection',
    title: 'Compute Hash from Selection',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.selectionText) return;

  if (info.menuItemId === 'slugify-selection') {
    const slug = slugify(info.selectionText);
    console.log('[Extension Background] Slug generated:', slug);

    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text: string) => {
          navigator.clipboard.writeText(text);
          console.log('[Extension Background] Copied slug to clipboard:', text);
        },
        args: [slug]
      });
    }
  } else if (info.menuItemId === 'hash-selection') {
    const hash = fastHash(info.selectionText);
    console.log('[Extension Background] Hash computed:', hash);

    if (tab?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (text: string) => {
          navigator.clipboard.writeText(text);
          console.log('[Extension Background] Copied hash to clipboard:', text);
        },
        args: [hash]
      });
    }
  }
});

// Background runtime message listener
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  console.log('[Extension Background] Message received:', message);

  if (message.type === 'GET_CORE_STATUS') {
    sendResponse({
      status: 'active',
      coreVersion: CORE_VERSION,
      timestamp: Date.now()
    });
  } else if (message.type === 'TRANSFORM_TEXT') {
    const text = message.payload?.text || '';
    sendResponse({
      slug: slugify(text),
      hash: fastHash(text),
      timestamp: Date.now()
    });
  }

  return true; // Keep message channel open for async response
});

