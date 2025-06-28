// js/app.js

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
const configControls = document.querySelectorAll('.config-panel input[type="checkbox"], .config-panel select');

// --- FUNCTIONS ---

/**
 * Toggles the color theme between light and dark.
 */
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
    }
    
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Add subtle feedback
    themeToggleButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
        themeToggleButton.style.transform = '';
    }, 150);
}

/**
 * Loads the saved theme from localStorage with light as default.
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    // Default to light theme
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    } else {
        // Explicitly set to light (remove any dark theme attribute)
        document.body.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        // If no saved theme exists, save 'light' as preference
        if (!savedTheme) {
            localStorage.setItem('theme', 'light');
        }
    }
}

/**
 * Updates the preview and generated code based on user selections.
 */
function updatePreview() {
    try {
        // Get all selected values
        const platforms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);
        const iconColor = document.getElementById('icon-color').value;
        const displayStyle = document.getElementById('display-style').value;
        const buttonStyle = document.getElementById('button-style').value;
        const size = document.getElementById('button-size').value;
        const position = document.getElementById('position').value;

        // --- Update Preview ---
        previewContainer.innerHTML = ''; // Clear previous buttons

        if (platforms.length === 0) {
            previewContainer.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">Select at least one platform to see preview</p>';
            generatedCodeEl.textContent = '<!-- Please select at least one platform -->';
            return;
        }

        // Apply classes to the container for styling
        previewContainer.className = 'share-buttons'; // Reset classes
        previewContainer.classList.add(`size-${size}`, `style-${buttonStyle}`, `position-${position}`);

        platforms.forEach(platformId => {
            const config = platformConfig[platformId];
            if (!config) return;

            const button = document.createElement('a');
            button.href = '#'; // Use '#' for preview purposes
            button.className = `share-button ${platformId}`;
            button.setAttribute('aria-label', `Share on ${config.label}`);
            
            // Prevent default link behavior in preview
            button.addEventListener('click', (e) => e.preventDefault());
            
            if (displayStyle === 'icon-only') button.classList.add('icon-only');
            if (displayStyle === 'text-only') button.classList.add('text-only');

            const iconSrc = iconColor === 'color' ? config.colorIcon : config.blackIcon;
            const iconHtml = `<img src="${iconSrc}" alt="${config.label}" class="share-button-icon" loading="lazy">`;

            if (displayStyle === 'text-only') {
                button.innerHTML = config.label;
            } else if (displayStyle === 'icon-only') {
                button.innerHTML = iconHtml;
            } else { // icon-text
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

        generatedCodeEl.textContent = code;
    } catch (error) {
        console.error('Error updating preview:', error);
        previewContainer.innerHTML = '<p style="color: red; text-align: center;">Error generating preview</p>';
    }
}

/**
 * Copies the generated code to the clipboard with improved feedback.
 */
async function copyCode() {
    try {
        const codeToCopy = generatedCodeEl.textContent;
        
        if (!codeToCopy || codeToCopy.includes('Please select')) {
            return;
        }

        await navigator.clipboard.writeText(codeToCopy);
        
        // Visual feedback
        const originalText = copyCodeButton.textContent;
        copyCodeButton.textContent = 'Copied!';
        copyCodeButton.style.background = '#10b981';
        
        // Show success message
        copySuccessEl.classList.add('show');
        
        setTimeout(() => {
            copyCodeButton.textContent = originalText;
            copyCodeButton.style.background = '';
            copySuccessEl.classList.remove('show');
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = generatedCodeEl.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            copyCodeButton.textContent = 'Copied!';
            setTimeout(() => {
                copyCodeButton.textContent = 'Copy';
            }, 2000);
        } catch (fallbackErr) {
            console.error('Fallback copy failed: ', fallbackErr);
        }
        document.body.removeChild(textArea);
    }
}

/**
 * Handles form validation and user feedback.
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

        // Listen for system theme changes (but still default to light)
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                localStorage.setItem('theme', 'light'); // Still default to light
                loadSavedTheme();
            }
        });

        // Set dynamic content and initial state
        currentYearEl.textContent = new Date().getFullYear();
        loadSavedTheme(); // This will default to light theme
        updatePreview();
        
        // Add loading feedback for initial render
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// --- INITIALIZATION ---
// Prevent flash of unstyled content
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Run the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
