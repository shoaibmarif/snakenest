export interface ShareResult {
  shared: boolean;
  method: 'native' | 'clipboard' | 'failed';
  message: string;
}

export async function shareGameScore(score: number, modeName: string): Promise<ShareResult> {
  const shareText = `I scored ${score} points in Snake Game (${modeName})! Can you beat my score? 🐍 Play now: ${window.location.href}`;
  const shareData = {
    title: 'Snake Game Online Score',
    text: shareText,
    url: window.location.href
  };

  if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return {
        shared: true,
        method: 'native',
        message: 'Score shared successfully!'
      };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return {
          shared: false,
          method: 'native',
          message: 'Share cancelled.'
        };
      }
      // Fall through to clipboard
    }
  }

  // Fallback to Clipboard
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shareText);
      return {
        shared: true,
        method: 'clipboard',
        message: 'Score and game link copied to clipboard!'
      };
    } catch {
      return {
        shared: false,
        method: 'failed',
        message: 'Unable to copy score to clipboard.'
      };
    }
  }

  return {
    shared: false,
    method: 'failed',
    message: 'Sharing is not supported on this device/browser.'
  };
}

