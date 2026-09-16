import { useEffect } from 'react';

export interface PageSEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
}

/**
 * Custom React hook for dynamic Single Page Application (SPA) SEO management.
 * Synchronizes document title, canonical link, meta descriptions, robots directives,
 * Open Graph, and Twitter card tags dynamically across route changes.
 */
export const usePageSEO = ({
  title,
  description,
  canonicalUrl,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  ogType = 'website',
  ogImage = 'https://snakenest.netlify.app/og-snake-game.png'
}: PageSEOConfig): void => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to set or create a <meta> tag by name or property
    const setMetaTag = (attributeName: 'name' | 'property', attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'robots', robots);

    // 3. Open Graph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:url', canonicalUrl);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, canonicalUrl, robots, ogType, ogImage]);
};
