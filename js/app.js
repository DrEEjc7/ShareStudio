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
const configControls = document.querySelectorAll('.config-panel input[type="checkbox"], .config-panel select');

// --- FUNCTIONS ---

/**
 * Toggles the color theme between light and dark.
 */
function toggleTheme() {
    const isDark = document.body.toggleAttribute('data-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
}

/**
 * Loads the saved theme from localStorage.
 */
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }
}

/**
 * Updates the preview and generated code based on user selections.
 */
function updatePreview() {
    // Get all selected values
    const platforms = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.id);
    const iconColor = document.getElementById('icon-color').value;
    const displayStyle = document.getElementById('display-style').value;
    const buttonStyle = document.getElementById('button-style').value;
    const size = document.getElementById('button-size').value;
    const position = document.getElementById('position').value;

    // --- Update Preview ---
    previewContainer.innerHTML = ''; // Clear previous buttons

    // Apply classes to the container for styling
    previewContainer.className = 'share-buttons'; // Reset classes
    previewContainer.classList.add(`size-${size}`, `style-${buttonStyle}`, `position-${position}`);

    platforms.forEach(platformId => {
        const config = platformConfig[platformId];
        if (!config) return;

        const button = document.createElement('a');
        button.href = '#'; // Use '#' for preview purposes
        button.className = `share-button ${platformId}`;
        
        if (displayStyle === 'icon-only') button.classList.add('icon-only');
        if (displayStyle === 'text-only') button.classList.add('text-only');

        const iconSrc = iconColor === 'color' ? config.colorIcon : config.blackIcon;
        const iconHtml = `<img src="${iconSrc}" alt="${config.label}" class="share-button-icon">`;

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
}

/**
 * Copies the generated code to the clipboard.
 */
function copyCode() {
    const codeToCopy = generatedCodeEl.textContent;
    navigator.clipboard.writeText(codeToCopy).then(() => {
        const originalText = copyCodeButton.textContent;
        copyCodeButton.textContent = 'Copied!';
        setTimeout(() => {
            copyCodeButton.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

/**
 * Initializes the application.
 */
function init() {
    // Set up event listeners
    themeToggleButton.addEventListener('click', toggleTheme);
    copyCodeButton.addEventListener('click', copyCode);
    configControls.forEach(control => {
        control.addEventListener('change', updatePreview);
    });

    // Set dynamic content and initial state
    currentYearEl.textContent = new Date().getFullYear();
    loadSavedTheme();
    updatePreview();
}

// --- INITIALIZATION ---
// Run the app
init();
