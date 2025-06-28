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
            const code = `<script src="https://cdn.sharebuttons.dev/widget.js"
    data-platforms="${platforms.join(',')}"
    data-icon-color="${iconColor}"
    data-display-style="${displayStyle}"
    data-button-style="${buttonStyle}"
    data-size="${size}"
    data-position="${position}"
    defer><\/script>`;
            
            generatedCodeEl.textContent = code.trim();

        } catch (error) {
            console.error('Error updating preview:', error);
            previewContainer.innerHTML = '<p style="color: red;">Error generating preview. Check console for details.</p>';
        }
    }

    /**
     * Copies the generated code to the clipboard with visual feedback.
     */
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
