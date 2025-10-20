# Spring Minds - Non-Profit Website

A responsive, accessible, and user-friendly front-end website for **Spring Minds**, a non-profit initiative empowering parents and educators to nurture young minds through learning resources, workshops, and holistic child development support.

## 🌟 Features

### Accessibility
- **WCAG 2.1 AA Compliant**: Meets web accessibility standards
- **Semantic HTML5**: Proper use of semantic elements for screen readers
- **ARIA Labels**: Comprehensive ARIA attributes for assistive technologies
- **Keyboard Navigation**: Full keyboard accessibility support
- **Skip to Content**: Quick navigation link for screen reader users
- **Color Contrast**: All text meets minimum contrast ratios
- **Focus Indicators**: Clear focus styles for keyboard navigation

### Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices first
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
- **Flexible Layouts**: CSS Grid and Flexbox for adaptable designs
- **Touch-Friendly**: Large tap targets for mobile users
- **Hamburger Menu**: Mobile navigation with smooth animations

### User Experience
- **Smooth Scrolling**: Animated navigation to page sections
- **Interactive Elements**: Hover effects and transitions
- **Form Validation**: Client-side validation for contact form
- **Notification System**: User feedback for form submissions
- **Active Navigation**: Highlights current section in navigation
- **Print Styles**: Optimized layout for printing

## 📁 Project Structure

```
Tumi-Tech-Hub/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Comprehensive CSS with responsive design
├── script.js           # JavaScript for interactive functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser.

### Option 2: Local Server (Recommended)
For full functionality, serve the files using a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📱 Sections

### 1. **Hero Section**
- Engaging headline and mission statement
- Call-to-action buttons for quick navigation

### 2. **About Section**
- Organization overview
- Mission statement
- Core values

### 3. **Services Section**
- Six key service offerings with icons
- Grid layout responsive to all screen sizes
- Interactive hover effects

### 4. **Resources Section**
- Categorized resources for Parents, Educators, and Children
- Checkmark-style bullet points
- Easy-to-scan layout

### 5. **Workshops Section**
- List of available workshops
- Duration and skill level indicators
- Detailed descriptions

### 6. **Contact Section**
- Contact information (email, phone, address)
- Functional contact form with validation
- User-friendly error messages

### 7. **Footer**
- Quick links navigation
- Organization information
- Copyright and legal links

## 🎨 Design Principles

### Color Scheme
- **Primary**: Blue (#2563eb) - Trust and professionalism
- **Secondary**: Green (#10b981) - Growth and learning
- **Accent**: Amber (#f59e0b) - Energy and optimism
- **Text**: Gray scale for readability

### Typography
- **Headings**: Georgia (serif) - Classic and trustworthy
- **Body**: System fonts - Fast loading and familiar

### Spacing
- Consistent spacing system using CSS variables
- Generous padding for comfortable reading
- Clear visual hierarchy

## 🔧 Technical Features

### HTML
- Valid HTML5 markup (W3C validated)
- Semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Proper heading hierarchy
- Meta tags for SEO

### CSS
- CSS Variables for easy theming
- Mobile-first responsive design
- CSS Grid and Flexbox layouts
- Smooth transitions and animations
- Print-friendly styles
- Reduced motion support for accessibility

### JavaScript
- Vanilla JavaScript (no dependencies)
- Mobile menu toggle with proper ARIA states
- Smooth scrolling to anchors
- Form validation with user feedback
- Active navigation highlighting
- Keyboard accessibility enhancements
- Performance optimizations (debouncing, requestAnimationFrame)

## ♿ Accessibility Features

- **Semantic HTML**: Proper structure for assistive technologies
- **ARIA Attributes**: Labels, roles, and states where needed
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Skip Link**: Bypass navigation to main content
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: Meets WCAG AA standards (4.5:1 for normal text)
- **Form Labels**: All form inputs properly labeled
- **Alt Text**: Ready for images (when added)
- **Screen Reader Testing**: Tested with accessibility tree

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **No External Dependencies**: Pure HTML, CSS, and JavaScript
- **Fast Load Times**: Minimal file sizes
- **Optimized Images**: Ready for lazy loading when images are added
- **Efficient CSS**: No unused styles
- **Optimized JavaScript**: Debounced scroll events, requestAnimationFrame

## 🎯 Future Enhancements

- Add actual images with lazy loading
- Implement backend for contact form
- Add multi-language support
- Include blog/news section
- Add testimonials section
- Integrate social media feeds
- Add donation functionality
- Include event calendar

## 📝 Customization

### Changing Colors
Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
}
```

### Modifying Content
Edit the text directly in `index.html`. The structure is clearly commented.

### Adding Images
Replace icon emojis with actual images:

```html
<img src="path/to/image.jpg" alt="Descriptive text" loading="lazy">
```

## 🧪 Testing

### Manual Testing Checklist
- ✅ Desktop view (1920x1080)
- ✅ Tablet view (768x1024)
- ✅ Mobile view (375x667)
- ✅ Navigation menu functionality
- ✅ Smooth scrolling to sections
- ✅ Form validation
- ✅ Keyboard navigation
- ✅ Screen reader compatibility
- ✅ HTML validation (W3C)
- ✅ Cross-browser testing

## 📄 License

This project is open source and available for non-profit use.

## 👥 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## 📧 Contact

For questions or suggestions about this website:
- Email: info@springminds.org
- Phone: +1 (234) 567-890

---

**Built with ❤️ for Spring Minds - Empowering Young Minds**
