/**
 * Share Studio - Social Media Share Buttons Widget
 * 
 * A lightweight, customizable social media share buttons widget that works
 * by extracting page metadata (title, description, og tags) for optimal sharing.
 * 
 * @version 1.0.0
 * @author Dee7 Studio (https://dee7studio.com)
 * @repository https://github.com/DrEEjc7/share-studio
 * @license MIT
 * 
 * Usage:
 * <script src="https://cdn.jsdelivr.net/gh/DrEEjc7/share-studio@latest/dist/share-buttons.min.js"
 *     data-platforms="facebook,x,linkedin"
 *     data-icon-color="color"
 *     data-display-style="icon-text"
 *     data-button-style="rounded"
 *     data-size="medium"
 *     data-position="inline"
 *     defer>
 * </script>
 */

(function() {
    'use strict';

    /**
     * Configuration for each social media platform
     * Contains labels, icons, and share URLs for all supported platforms
     */
    const platformConfig = {
        facebook: { 
            label: 'Facebook', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Facebook.svg?updatedAt=1751101326689', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Facebook_black.svg?updatedAt=1751101326631',
            shareUrl: 'https://www.facebook.com/sharer/sharer.php?u='
        },
        x: { 
            label: 'X', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/X.svg?updatedAt=1751101329412', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/X_black.svg?updatedAt=1751101329529',
            shareUrl: 'https://twitter.com/intent/tweet?url='
        },
        linkedin: { 
            label: 'LinkedIn', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/LinkedIn.svg?updatedAt=1751101326668', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/LinkedIn_Black.svg?updatedAt=1751101326659',
            shareUrl: 'https://www.linkedin.com/sharing/share-offsite/?url='
        },
        pinterest: { 
            label: 'Pinterest', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Pinterest.svg?updatedAt=1751101326628', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Pinterest_Black.svg?updatedAt=1751101326649',
            shareUrl: 'https://pinterest.com/pin/create/button/?url='
        },
        reddit: { 
            label: 'Reddit', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Reddit.svg?updatedAt=1751102199116', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Reddit_Black.svg?updatedAt=1751102199078',
            shareUrl: 'https://www.reddit.com/submit?url='
        },
        tiktok: { 
            label: 'TikTok', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Tok%20Tok.svg?updatedAt=1751101326673', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Tok%20Tok_Black.svg?updatedAt=1751101326653',
            shareUrl: 'https://www.tiktok.com/share?url='
        },
        instagram: { 
            label: 'Instagram', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Instagram.svg?updatedAt=1751100484264', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Instagram_black.svg?updatedAt=1751100510415',
            shareUrl: null // Special case - Instagram doesn't support direct URL sharing
        },
        copy: { 
            label: 'Copy Link', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Copy%20Link.svg?updatedAt=1751101326655', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Copy%20Link_black.svg?updatedAt=1751101326620',
            shareUrl: null // Special case - copy functionality
        }
    };

    /**
     * Initialize all share widgets on the page
     * Looks for script tags with share-buttons source and creates widgets based on their data attributes
     */
    function initShareWidget() {
        // Find all script tags that include 'share-buttons' in their src
        const scripts = document.querySelectorAll('script[src*="share-buttons"]');
        
        scripts.forEach(script => {
            // Extract configuration from data attributes
            const config = {
                platforms: (script.dataset.platforms || 'facebook,x,linkedin').split(','),
                iconColor: script.dataset.iconColor || 'color',
                displayStyle: script.dataset.displayStyle || 'icon-text',
                buttonStyle: script.dataset.buttonStyle || 'rounded',
                size: script.dataset.size || 'medium',
                position: script.dataset.position || 'inline'
            };

            // Create the widget for this script tag
            createWidget(script, config);
        });
    }

    /**
     * Create a complete share widget based on configuration
     * @param {HTMLElement} scriptElement - The script tag that triggered this widget
     * @param {Object} config - Configuration object with all widget settings
     */
    function createWidget(scriptElement, config) {
        // Create the main widget container
        const widget = document.createElement('div');
        widget.className = `share-widget share-widget-${config.position} share-widget-${config.size} share-widget-${config.buttonStyle}`;
        
        // Add CSS styles if not already present on the page
        if (!document.getElementById('share-widget-styles')) {
            addStyles();
        }

        // Generate share buttons for each selected platform
        config.platforms.forEach(platformId => {
            const platformData = platformConfig[platformId];
            if (!platformData) {
                console.warn(`Share Studio: Unknown platform "${platformId}"`);
                return;
            }

            const button = createButton(platformData, config, platformId);
            widget.appendChild(button);
        });

        // Insert the widget after the script tag
        scriptElement.parentNode.insertBefore(widget, scriptElement.nextSibling);
        
        console.log('Share Studio widget initialized with platforms:', config.platforms);
    }

    /**
     * Create an individual share button
     * @param {Object} platformData - Data for the specific platform (icons, labels, etc.)
     * @param {Object} config - Widget configuration
     * @param {string} platformId - Platform identifier (facebook, x, etc.)
     * @returns {HTMLElement} The created button element
     */
    function createButton(platformData, config, platformId) {
        // Create the button element
        const button = document.createElement('a');
        button.href = '#';
        button.className = `share-btn share-btn-${platformId}`;
        button.setAttribute('aria-label', `Share on ${platformData.label}`);
        button.setAttribute('role', 'button');
        button.dataset.platform = platformId;

        // Add display style classes
        if (config.displayStyle === 'icon-only') {
            button.classList.add('icon-only');
        }
        if (config.displayStyle === 'text-only') {
            button.classList.add('text-only');
        }

        // Choose the appropriate icon based on color preference
        const iconSrc = config.iconColor === 'color' ? platformData.colorIcon : platformData.blackIcon;
        
        // Build button content based on display style
        if (config.displayStyle === 'text-only') {
            button.textContent = platformData.label;
        } else if (config.displayStyle === 'icon-only') {
            button.innerHTML = `<img src="${iconSrc}" alt="${platformData.label}" class="share-btn-icon" loading="lazy">`;
        } else {
            // icon-text (default)
            button.innerHTML = `<img src="${iconSrc}" alt="${platformData.label}" class="share-btn-icon" loading="lazy"> ${platformData.label}`;
        }

        // Add click event handler
        button.addEventListener('click', handleShare);

        return button;
    }

    /**
     * Handle click events on share buttons
     * @param {Event} e - The click event
     */
    function handleShare(e) {
        e.preventDefault();
        
        const platform = this.dataset.platform;
        const platformData = platformConfig[platform];
        
        if (!platformData) {
            console.error('Share Studio: Invalid platform data');
            return;
        }

        // Get current page information for sharing
        const pageInfo = getPageInfo();
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                // Facebook automatically pulls OpenGraph tags, just need the URL
                shareUrl = platformData.shareUrl + pageInfo.url;
                break;
                
            case 'x':
                // X (Twitter) supports URL + text
                const twitterText = pageInfo.description ? 
                    `${decodeURIComponent(pageInfo.title)} - ${decodeURIComponent(pageInfo.description).substring(0, 100)}...` : 
                    decodeURIComponent(pageInfo.title);
                shareUrl = `${platformData.shareUrl}${pageInfo.url}&text=${encodeURIComponent(twitterText)}`;
                break;
                
            case 'linkedin':
                // LinkedIn automatically pulls page metadata
                shareUrl = platformData.shareUrl + pageInfo.url;
                break;
                
            case 'pinterest':
                // Pinterest supports URL + description + media
                const pinterestDescription = pageInfo.description || pageInfo.title;
                shareUrl = `${platformData.shareUrl}${pageInfo.url}&description=${pinterestDescription}`;
                if (pageInfo.image) {
                    shareUrl += `&media=${pageInfo.image}`;
                }
                break;
                
            case 'reddit':
                // Reddit supports URL + title
                shareUrl = `${platformData.shareUrl}${pageInfo.url}&title=${pageInfo.title}`;
                break;
                
            case 'tiktok':
                // TikTok supports URL + title
                shareUrl = `${platformData.shareUrl}${pageInfo.url}&title=${pageInfo.title}`;
                break;
                
            case 'instagram':
                // Instagram doesn't support direct URL sharing
                const instagramText = `${decodeURIComponent(pageInfo.title)}\n\n${window.location.href}`;
                copyToClipboard(instagramText, this, 'Content copied! You can now paste it in Instagram.');
                return;
                
            case 'copy':
                // Copy page title and URL to clipboard
                const copyText = `${decodeURIComponent(pageInfo.title)}\n${window.location.href}`;
                copyToClipboard(copyText, this, 'Copied!');
                return;
                
            default:
                console.error(`Share Studio: Unhandled platform "${platform}"`);
                return;
        }
        
        // Open share dialog if we have a URL
        if (shareUrl) {
            const shareWindow = window.open(
                shareUrl, 
                'share-dialog', 
                'width=600,height=500,resizable=yes,scrollbars=yes,location=yes'
            );
            
            // Focus the share window if it opened successfully
            if (shareWindow) {
                shareWindow.focus();
            }
        }
    }

    /**
     * Extract page information for sharing (title, description, image)
     * Prioritizes OpenGraph tags, falls back to standard meta tags
     * @returns {Object} Page information object
     */
    function getPageInfo() {
        const currentUrl = encodeURIComponent(window.location.href);
        
        // Get page title - prioritize OpenGraph, fallback to title tag
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const titleTag = document.querySelector('title');
        const pageTitle = encodeURIComponent(
            (ogTitle && ogTitle.content) || 
            (titleTag && titleTag.textContent) || 
            document.title || 
            'Shared from ' + window.location.hostname
        );
        
        // Get page description - prioritize OpenGraph, fallback to meta description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const metaDescription = document.querySelector('meta[name="description"]');
        const pageDescription = encodeURIComponent(
            (ogDescription && ogDescription.content) || 
            (metaDescription && metaDescription.content) || 
            ''
        );
        
        // Get page image for platforms that support it
        const ogImage = document.querySelector('meta[property="og:image"]');
        const pageImage = ogImage && ogImage.content ? encodeURIComponent(ogImage.content) : '';
        
        return { 
            url: currentUrl, 
            title: pageTitle, 
            description: pageDescription, 
            image: pageImage 
        };
    }

    /**
     * Copy text to clipboard with visual feedback
     * @param {string} text - Text to copy
     * @param {HTMLElement} button - Button element to show feedback on
     * @param {string} successMessage - Message to show on success
     */
    function copyToClipboard(text, button, successMessage) {
        // Try modern clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyFeedback(button, successMessage);
            }).catch(error => {
                console.warn('Clipboard API failed, using fallback:', error);
                copyFallback(text, button, successMessage);
            });
        } else {
            // Use fallback for older browsers or non-HTTPS contexts
            copyFallback(text, button, successMessage);
        }
    }

    /**
     * Fallback copy method for older browsers
     * @param {string} text - Text to copy
     * @param {HTMLElement} button - Button element to show feedback on
     * @param {string} successMessage - Message to show on success
     */
    function copyFallback(text, button, successMessage) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.setAttribute('readonly', '');
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopyFeedback(button, successMessage);
            } else {
                console.error('Copy command failed');
            }
        } catch (err) {
            console.error('Copy fallback failed:', err);
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Show visual feedback when copy operation succeeds
     * @param {HTMLElement} button - Button to show feedback on
     * @param {string} message - Success message to display
     */
    function showCopyFeedback(button, message) {
        const originalHtml = button.innerHTML;
        
        // Update button text while preserving icons
        if (button.innerHTML.includes('img')) {
            button.innerHTML = button.innerHTML.replace(/>[^<]*$/, '>' + message);
        } else {
            button.innerHTML = message;
        }
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalHtml;
        }, 2000);
    }

    /**
     * Add CSS styles to the page
     * Only adds styles once per page, even if multiple widgets are present
     */
    function addStyles() {
        const style = document.createElement('style');
        style.id = 'share-widget-styles';
        style.textContent = `
/* Share Studio Widget Styles */
.share-widget {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1;
}

/* Floating widget positioning */
.share-widget-floating-left,
.share-widget-floating-right {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.75rem;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    backdrop-filter: blur(8px);
}

.share-widget-floating-left { 
    left: 20px; 
}

.share-widget-floating-right { 
    right: 20px; 
}

/* Base button styles */
.share-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.2s ease;
    cursor: pointer;
    background: #ffffff;
    color: #1a1a1a;
    border: 1px solid #e5e7eb;
    white-space: nowrap;
    outline: none;
}

.share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.share-btn:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.share-btn:active {
    transform: translateY(-1px);
}

/* Size variations */
.share-widget-small .share-btn { 
    padding: 0.5rem 1rem; 
    font-size: 12px; 
}

.share-widget-medium .share-btn { 
    padding: 0.75rem 1rem; 
    font-size: 14px; 
}

.share-widget-large .share-btn { 
    padding: 1rem 1.5rem; 
    font-size: 16px; 
}

/* Icon-only button padding */
.share-widget-small .share-btn.icon-only { 
    padding: 0.5rem; 
}

.share-widget-medium .share-btn.icon-only { 
    padding: 0.75rem; 
}

.share-widget-large .share-btn.icon-only { 
    padding: 1rem; 
}

/* Button style variations */
.share-widget-rounded .share-btn { 
    border-radius: 8px; 
}

.share-widget-square .share-btn { 
    border-radius: 4px; 
}

.share-widget-circle .share-btn { 
    border-radius: 999px; 
}

.share-widget-circle .share-btn.icon-only { 
    border-radius: 50%; 
}

/* Text-only style */
.share-btn.text-only {
    background: transparent;
    border: none;
    padding: 0.5rem;
    color: #6b7280;
}

.share-btn.text-only:hover {
    color: #1a1a1a;
    background: transparent;
    transform: none;
    box-shadow: none;
}

/* Icon styling */
.share-btn-icon {
    flex-shrink: 0;
    display: block;
}

.share-widget-small .share-btn-icon { 
    width: 16px; 
    height: 16px; 
}

.share-widget-medium .share-btn-icon { 
    width: 20px; 
    height: 20px; 
}

.share-widget-large .share-btn-icon { 
    width: 24px; 
    height: 24px; 
}

/* Responsive design */
@media (max-width: 768px) {
    .share-widget-floating-left { 
        left: 10px; 
    }
    
    .share-widget-floating-right { 
        right: 10px; 
    }
    
    .share-widget { 
        gap: 0.5rem; 
    }
    
    .share-widget-floating-left,
    .share-widget-floating-right {
        padding: 0.5rem;
    }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
    .share-widget-floating-left,
    .share-widget-floating-right {
        background: #1f2937;
        border-color: #374151;
        color: #ffffff;
    }
    
    .share-btn {
        background: #1f2937;
        color: #ffffff;
        border-color: #374151;
    }
    
    .share-btn:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
}

/* Print styles */
@media print {
    .share-widget {
        display: none;
    }
}`;
        
        document.head.appendChild(style);
    }

    /**
     * Initialize the widget when DOM is ready
     * Uses multiple methods to ensure compatibility across browsers
     */
    function initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initShareWidget);
        } else {
            // DOM is already ready
            initShareWidget();
        }
    }

    // Start initialization
    initialize();

})();
