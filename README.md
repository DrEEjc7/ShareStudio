# Share Studio

A minimalistic, customizable social media share button generator for websites. Create clean share buttons with just a few clicks.

![Share Studio Preview](https://via.placeholder.com/800x400/f8f9fa/1a1a1a?text=Share+Studio+Preview)

## ✨ Features

- **8 Social Platforms**: Facebook, X (Twitter), LinkedIn, Pinterest, Reddit, TikTok, Instagram, and Copy Link
- **Multiple Display Styles**: Icon + Text, Icon Only, or Text Only
- **Icon Color Options**: Colored icons or black icons
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Light/Dark Mode**: Built-in theme switching
- **Clean Code Output**: Lightweight, dependency-free implementation
- **Live Preview**: See exactly how your buttons will look

## 🚀 Quick Start

1. **Visit the Generator**: Open `index.html` in your browser
2. **Configure Your Buttons**: Select platforms, choose display style, and customize appearance
3. **Copy the Code**: Click the copy button to get your generated code
4. **Add to Your Website**: Paste the code into your HTML

## 📋 Generated Code Example

```html
<script src="https://cdn.sharebuttons.dev/widget.js" 
        data-platforms="facebook,x,linkedin"
        data-icon-color="color"
        data-display-style="icon-text"
        data-button-style="rounded"
        data-size="medium"
        data-position="inline">
</script>
```

## 🛠️ Installation

### Option 1: Download and Host
1. Clone or download this repository
2. Upload the files to your web server
3. Access via your domain

### Option 2: GitHub Pages
1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/share-studio`

## 📁 Project Structure

```
share-studio/
├── index.html          # Main HTML file
├── css/
│   └── main.css        # All styles and theme variables
├── js/
│   └── app.js          # Application logic and functionality
└── README.md           # Project documentation
```

## ⚙️ Configuration Options

### Platforms
- **Facebook**: Share to Facebook
- **X (Twitter)**: Share to X/Twitter
- **LinkedIn**: Share to LinkedIn
- **Pinterest**: Pin to Pinterest
- **Reddit**: Submit to Reddit
- **TikTok**: Share to TikTok
- **Instagram**: Share to Instagram
- **Copy Link**: Copy page URL to clipboard

### Display Styles
- **Icon + Text**: Traditional button with icon and platform name
- **Icon Only**: Minimalist icon-only buttons
- **Text Only**: Clean text links without buttons

### Icon Colors
- **Color**: Platform-specific colored icons
- **Black**: Uniform black icons for consistent styling

### Button Styles
- **Rounded**: Soft rounded corners
- **Square**: Sharp rectangular buttons
- **Circle**: Circular buttons (works best with icon-only)

### Sizes
- **Small**: Compact buttons for sidebars
- **Medium**: Standard size for most use cases
- **Large**: Prominent buttons for main content

### Positions
- **Inline**: Normal flow within content
- **Floating Left**: Fixed position on left side
- **Floating Right**: Fixed position on right side

## 🎨 Customization

### Themes
The app includes built-in light and dark modes. Theme preference is automatically saved to localStorage.

### CSS Variables
Customize the appearance by modifying CSS variables in `css/main.css`:

```css
:root {
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --text-primary: #1a1a1a;
    --text-secondary: #6b7280;
    --border-color: #e5e7eb;
    --accent-color: #000000;
}
```

### Adding New Platforms
To add a new social platform:

1. Add platform configuration to `js/app.js`:
```javascript
platformName: {
    label: 'Platform Name',
    colorIcon: 'path/to/color-icon.svg',
    blackIcon: 'path/to/black-icon.svg'
}
```

2. Add checkbox option in `index.html`:
```html
<div class="checkbox-item">
    <input type="checkbox" id="platformName" onchange="updatePreview()">
    <label for="platformName">Platform Name</label>
</div>
```

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **Features**: ES6+ features used, requires modern browser support

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup
1. Clone the repository
2. Open `index.html` in your browser
3. Make changes to CSS/JS files
4. Test functionality across different browsers

## 📧 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation above
- Review the code comments for implementation details

## 🏗️ Built With

- **Vanilla JavaScript**: No frameworks or dependencies
- **CSS Grid & Flexbox**: Modern responsive layouts
- **CSS Custom Properties**: Theme system and customization
- **Local Storage API**: Theme preference persistence

## 🔗 Links

- [Live Demo](https://yourusername.github.io/share-studio)
- [Report Bug](https://github.com/yourusername/share-studio/issues)
- [Request Feature](https://github.com/yourusername/share-studio/issues)

---

**Share Studio** - Created with ❤️ by [Dee7 Studio](https://dee7studio.com)
