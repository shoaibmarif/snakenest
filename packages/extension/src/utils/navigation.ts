/**
 * Safely open external links in Chrome extension or browser window
 */
export function openExternalUrl(url: string): void {
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.create) {
    chrome.tabs.create({ url });
  } else if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export const SOCIAL_LINKS = {
  webApp: 'https://snakenest.netlify.app/',
  github: 'https://github.com/shoaibmarif',
  linkedin: 'https://www.linkedin.com/in/shoaibmarif/'
};

