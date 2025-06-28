// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const platformConfig = {
        facebook: { 
            label: 'Facebook', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Facebook.svg?updatedAt=1751101326689', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Facebook_black.svg?updatedAt=1751101326631' 
        },
        x: { 
            label: 'X', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/X.svg?updatedAt=1751101329412', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/X_black.svg?updatedAt=1751101329529' 
        },
        linkedin: { 
            label: 'LinkedIn', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/LinkedIn.svg?updatedAt=1751101326668', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/LinkedIn_Black.svg?updatedAt=1751101326659' 
        },
        pinterest: { 
            label: 'Pinterest', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Pinterest.svg?updatedAt=1751101326628', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Pinterest_Black.svg?updatedAt=1751101326649' 
        },
        reddit: { 
            label: 'Reddit', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Reddit.svg?updatedAt=1751102199116', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Reddit_Black.svg?updatedAt=1751102199078' 
        },
        tiktok: { 
            label: 'TikTok', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Tok%20Tok.svg?updatedAt=1751101326673', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Tok%20Tok_Black.svg?updatedAt=1751101326653' 
        },
        instagram: { 
            label: 'Instagram', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Instagram.svg?updatedAt=1751100484264', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Instagram_black.svg?updatedAt=1751100510415' 
        },
        copy: { 
            label: 'Copy Link', 
            colorIcon: 'https://ik.imagekit.io/dee7studio/Icons/Copy%20Link.svg?updatedAt=1751101326655', 
            blackIcon: 'https://ik.imagekit.io/dee7studio/Icons/Copy%20Link_black.svg?updatedAt=1751101326620' 
        }
    };

    // --- ELEMENT SELECTORS ---
    const themeToggleButton = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const copyCodeButton = document.getElementById('copy-code-btn');
    const generatedCodeEl = document.getElementById('generated-code');
    const previewContainer = document.getElementById('preview-buttons');
    const currentYearEl = document.getElementById('current-year');
    const copySuccessEl = document.getElementById('copy-success');
    const configControls = document.querySelectorAll('.config-panel input, .config-panel select');

    /**
     * Sets the theme, updating the DOM and localStorage.
     * @param {string} theme - The theme to set ('light' or 'dark').
     */
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️';
        } else {
            document.body.removeAttribute('data-theme');
            themeIcon.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    }

    /**
     * Toggles the color theme between light and dark.
     */
    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        
        // Add visual feedback
        themeToggleButton.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggleButton.style.transform = '';
        }, 150);
    }

    /**
     * Loads the saved theme from localStorage, defaulting to light mode.
     */
    function loadInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        // Always default to light theme if no saved preference
        setTheme(savedTheme || 'light');
    }

    /**
     * Updates the preview and generated code based on user selections.
     */
    function updatePreview() {
        try {
            const platforms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);
            const iconColor = document.getElementById('icon-color').value;
            const displayStyle = document.getElementById('display-style').value;
            const buttonStyle = document.getElementById('button-style').value;
            const size = document.getElementById('button-size').value;
            const position = document.getElementById('position').value;

            // --- Update Preview ---
            previewContainer.innerHTML = '';
            
            if (platforms.length === 0) {
                previewContainer.innerHTML = '<p class="panel-subtitle">Select a platform to see the preview.</p>';
                generatedCodeEl.textContent = '';
                return;
            }

            previewContainer.className = 'share-buttons'; // Reset classes
            previewContainer.classList.add(`size-${size}`, `style-${buttonStyle}`, `position-${position}`);

            platforms.forEach(platformId => {
                const config = platformConfig[platformId];
                if (!config) return;

                const button = document.createElement('a');
                button.href = '#';
                button.className = `share-button ${platformId}`;
                button.setAttribute('aria-label', `Share on ${config.label}`);
                button.addEventListener('click', (e) => e.preventDefault());
                
                if (displayStyle === 'icon-only') button.classList.add('icon-only');
                if (displayStyle === 'text-only') button.classList.add('text-only');

                const iconSrc = iconColor === 'color' ? config.colorIcon : config.blackIcon;
                const iconHtml = `<img src="${iconSrc}" alt="" class="share-button-icon" loading="lazy">`;

                if (displayStyle === 'text-only') {
                    button.textContent = config.label;
                } else if (displayStyle === 'icon-only') {
                    button.innerHTML = iconHtml;
                } else {
                    button.innerHTML = `${iconHtml} ${config.label}`;
                }
                previewContainer.appendChild(button);
            });
            
            // --- Update Generated Code ---
            const code = generateCompleteWidget(platforms, iconColor, displayStyle, buttonStyle, size, position);
            generatedCodeEl.textContent = code;

        } catch (error) {
            console.error('Error updating preview:', error);
            previewContainer.innerHTML = '<p style="color: red;">Error generating preview. Check console for details.</p>';
        }
    }

    /**
     * Generates complete, standalone widget code that works without external dependencies.
     */
    function generateCompleteWidget(platforms, iconColor, displayStyle, buttonStyle, size, position) {
        const shareUrls = {
            facebook: 'https://www.facebook.com/sharer/sharer.php?u=',
            x: 'https://twitter.com/intent/tweet?url=',
            linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=',
            pinterest: 'https://pinterest.com/pin/create/button/?url=',
            reddit: 'https://www.reddit.com/submit?url=',
            tiktok: 'https://www.tiktok.com/share?url=',
            instagram: '#', // Instagram doesn't support direct URL sharing
            copy: 'copy' // Special case for copy functionality
        };

        const buttonHtml = platforms.map(platformId => {
            const config = platformConfig[platformId];
            if (!config) return '';

            const iconSrc = iconColor === 'color' ? config.colorIcon : config.blackIcon;
            const shareUrl = shareUrls[platformId];
            
            let buttonContent = '';
            if (displayStyle === 'text-only') {
                buttonContent = config.label;
            } else if (displayStyle === 'icon-only') {
                buttonContent = `<img src="${iconSrc}" alt="${config.label}" class="share-btn-icon">`;
            } else {
                buttonContent = `<img src="${iconSrc}" alt="${config.label}" class="share-btn-icon"> ${config.label}`;
            }

            return `<a href="#" class="share-btn share-btn-${platformId}" data-platform="${platformId}" data-url="${shareUrl}" aria-label="Share on ${config.label}">${buttonContent}</a>`;
        }).join('');

        // Generate CSS based on configuration
        const css = `
.share-widget {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.share-widget.floating-left,
.share-widget.floating-right {
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
}

.share-widget.floating-left { left: 20px; }
.share-widget.floating-right { right: 20px; }

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
    ${size === 'small' ? 'padding: 0.5rem 1rem; font-size: 12px;' : ''}
    ${size === 'medium' ? 'padding: 0.75rem 1rem; font-size: 14px;' : ''}
    ${size === 'large' ? 'padding: 1rem 1.5rem; font-size: 16px;' : ''}
    ${buttonStyle === 'rounded' ? 'border-radius: 8px;' : ''}
    ${buttonStyle === 'square' ? 'border-radius: 4px;' : ''}
    ${buttonStyle === 'circle' ? 'border-radius: 999px;' : ''}
}

.share-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.share-btn.icon-only {
    ${size === 'small' ? 'padding: 0.5rem;' : ''}
    ${size === 'medium' ? 'padding: 0.75rem;' : ''}
    ${size === 'large' ? 'padding: 1rem;' : ''}
    ${buttonStyle === 'circle' ? 'border-radius: 50%;' : ''}
}

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

.share-btn-icon {
    ${size === 'small' ? 'width: 16px; height: 16px;' : ''}
    ${size === 'medium' ? 'width: 20px; height: 20px;' : ''}
    ${size === 'large' ? 'width: 24px; height: 24px;' : ''}
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .share-widget.floating-left { left: 10px; }
    .share-widget.floating-right { right: 10px; }
    .share-widget { gap: 0.5rem; }
}`;

        const javascript = `
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    // Get page information for sharing
    function getPageInfo() {
        const currentUrl = encodeURIComponent(window.location.href);
        
        // Get title - try OpenGraph first, then title tag
        const ogTitle = document.querySelector('meta[property="og:title"]');
        const titleTag = document.querySelector('title');
        const pageTitle = encodeURIComponent(
            (ogTitle && ogTitle.content) || 
            (titleTag && titleTag.textContent) || 
            document.title || 
            ''
        );
        
        // Get description - try OpenGraph first, then meta description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        const metaDescription = document.querySelector('meta[name="description"]');
        const pageDescription = encodeURIComponent(
            (ogDescription && ogDescription.content) || 
            (metaDescription && metaDescription.content) || 
            ''
        );
        
        // Get image for sharing
        const ogImage = document.querySelector('meta[property="og:image"]');
        const pageImage = ogImage && ogImage.content ? encodeURIComponent(ogImage.content) : '';
        
        return {
            url: currentUrl,
            title: pageTitle,
            description: pageDescription,
            image: pageImage
        };
    }
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            const shareUrl = this.dataset.url;
            const pageInfo = getPageInfo();
            
            let finalUrl = '';
            
            switch(platform) {
                case 'facebook':
                    // Facebook automatically pulls OG tags, just need URL
                    finalUrl = shareUrl + pageInfo.url;
                    break;
                    
                case 'x':
                    // Twitter: URL + text (title + description if available)
                    const twitterText = pageInfo.description ? 
                        pageInfo.title + ' - ' + decodeURIComponent(pageInfo.description).substring(0, 100) + '...' : 
                        pageInfo.title;
                    finalUrl = shareUrl + pageInfo.url + '&text=' + encodeURIComponent(twitterText);
                    break;
                    
                case 'linkedin':
                    // LinkedIn automatically pulls meta data, just need URL
                    finalUrl = shareUrl + pageInfo.url;
                    break;
                    
                case 'pinterest':
                    // Pinterest: URL + description + image
                    const pinterestDescription = pageInfo.description || pageInfo.title;
                    finalUrl = shareUrl + pageInfo.url + '&description=' + pinterestDescription;
                    if (pageInfo.image) {
                        finalUrl += '&media=' + pageInfo.image;
                    }
                    break;
                    
                case 'reddit':
                    // Reddit: URL + title
                    finalUrl = shareUrl + pageInfo.url + '&title=' + pageInfo.title;
                    break;
                    
                case 'tiktok':
                    // TikTok: URL + title
                    finalUrl = shareUrl + pageInfo.url + '&title=' + pageInfo.title;
                    break;
                    
                case 'instagram':
                    // Instagram doesn't support direct URL sharing
                    const instagramText = decodeURIComponent(pageInfo.title) + '\\n\\n' + window.location.href;
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(decodeURIComponent(pageInfo.title) + '\\n\\n' + window.location.href).then(() => {
                            alert('Content copied to clipboard! You can now paste it in Instagram.');
                        });
                    } else {
                        alert('To share on Instagram:\\n\\n' + decodeURIComponent(pageInfo.title) + '\\n\\n' + window.location.href + '\\n\\nCopy this text and share manually in the Instagram app.');
                    }
                    return;
                    
                case 'copy':
                    // Copy page title and URL
                    const copyText = decodeURIComponent(pageInfo.title) + '\\n' + window.location.href;
                    
                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(copyText).then(() => {
                            const originalHtml = this.innerHTML;
                            this.innerHTML = this.innerHTML.includes('img') ? 
                                this.innerHTML.replace(/>[^<]*$/, '>Copied!') : 
                                'Copied!';
                            setTimeout(() => {
                                this.innerHTML = originalHtml;
                            }, 2000);
                        }).catch(() => {
                            // Fallback
                            copyToClipboardFallback(copyText, this);
                        });
                    } else {
                        copyToClipboardFallback(copyText, this);
                    }
                    return;
            }
            
            if (finalUrl) {
                // Open share dialog
                const shareWindow = window.open(
                    finalUrl, 
                    'share-dialog', 
                    'width=600,height=500,resizable=yes,scrollbars=yes'
                );
                
                // Focus the share window
                if (shareWindow) {
                    shareWindow.focus();
                }
            }
        });
    });
    
    // Fallback copy function for older browsers
    function copyToClipboardFallback(text, button) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            const originalHtml = button.innerHTML;
            button.innerHTML = button.innerHTML.includes('img') ? 
                button.innerHTML.replace(/>[^<]*$/, '>Copied!') : 
                'Copied!';
            setTimeout(() => {
                button.innerHTML = originalHtml;
            }, 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
        
        document.body.removeChild(textArea);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShareButtons);
} else {
    initShareButtons();
}`;

        return `<!-- Share Studio Widget -->
<div class="share-widget ${position === 'inline' ? '' : position}">
${buttonHtml}
</div>

<style>
${css}
</style>

<script>
${javascript}
</script>`;
    }
    async function copyCode() {
        try {
            const codeToCopy = generatedCodeEl.textContent;
            
            if (!codeToCopy || codeToCopy.trim() === '') {
                return;
            }

            // Try modern clipboard API first
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(codeToCopy);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeToCopy;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            // Visual feedback
            const originalText = copyCodeButton.textContent;
            const originalBg = copyCodeButton.style.backgroundColor;
            
            copyCodeButton.textContent = 'Copied!';
            copyCodeButton.style.backgroundColor = '#28a745';
            
            // Show success message
            copySuccessEl.classList.add('show');
            
            setTimeout(() => {
                copyCodeButton.textContent = originalText;
                copyCodeButton.style.backgroundColor = originalBg;
                copySuccessEl.classList.remove('show');
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy: ', err);
            
            // Show error feedback
            const originalText = copyCodeButton.textContent;
            copyCodeButton.textContent = 'Error!';
            copyCodeButton.style.backgroundColor = '#dc3545';
            
            setTimeout(() => {
                copyCodeButton.textContent = originalText;
                copyCodeButton.style.backgroundColor = '';
            }, 2000);
        }
    }

    /**
     * Handles form validation and provides user feedback.
     */
    function validateForm() {
        const checkedPlatforms = document.querySelectorAll('input[type="checkbox"]:checked');
        const configPanel = document.querySelector('.config-panel');
        
        if (checkedPlatforms.length === 0) {
            configPanel.style.borderColor = '#ef4444';
            setTimeout(() => {
                configPanel.style.borderColor = '';
            }, 2000);
        }
    }

    /**
     * Initializes the application.
     */
    function init() {
        try {
            // Set up event listeners
            themeToggleButton.addEventListener('click', toggleTheme);
            copyCodeButton.addEventListener('click', copyCode);
            
            configControls.forEach(control => {
                control.addEventListener('change', () => {
                    updatePreview();
                    validateForm();
                });
            });

            // Set dynamic content and initial state
            currentYearEl.textContent = new Date().getFullYear();
            loadInitialTheme(); // This will default to light theme
            updatePreview();
            
            console.log('Share Studio initialized successfully');
            
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }

    // Initialize the application
    init();
});
