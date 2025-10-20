# Contributing to Spring Minds Website

Thank you for your interest in contributing to the Spring Minds website! This guide will help you get started.

## Development Guidelines

### Code Style

#### HTML
- Use semantic HTML5 elements
- Maintain proper heading hierarchy (h1 → h2 → h3)
- Include ARIA labels for accessibility
- Keep indentation consistent (2 spaces)
- Add comments for major sections

#### CSS
- Follow the existing CSS structure and organization
- Use CSS variables for colors and spacing
- Write mobile-first responsive styles
- Add comments for complex styles
- Maintain WCAG AA color contrast ratios

#### JavaScript
- Use ES6+ features
- Write vanilla JavaScript (no frameworks)
- Add comments for complex logic
- Use strict mode
- Handle errors gracefully
- Optimize performance (debounce, requestAnimationFrame)

### Accessibility Requirements

All contributions must maintain WCAG 2.1 AA compliance:

1. **Keyboard Navigation**: All interactive elements must be keyboard accessible
2. **ARIA Attributes**: Use appropriate ARIA labels and roles
3. **Color Contrast**: Maintain minimum 4.5:1 contrast ratio for normal text
4. **Focus Indicators**: Provide clear focus styles
5. **Semantic HTML**: Use appropriate semantic elements
6. **Alt Text**: Provide descriptive alt text for all images

### Testing Checklist

Before submitting a pull request, ensure:

- [ ] Code works on Chrome, Firefox, Safari, and Edge
- [ ] Responsive design works on mobile (375px), tablet (768px), and desktop (1200px+)
- [ ] All interactive elements are keyboard accessible
- [ ] Color contrast meets WCAG AA standards
- [ ] HTML validates with W3C validator
- [ ] JavaScript has no syntax errors
- [ ] No console errors or warnings
- [ ] Smooth scrolling and animations work correctly
- [ ] Forms validate properly
- [ ] Mobile menu opens and closes correctly

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/fauziya979/Tumi-Tech-Hub.git
   cd Tumi-Tech-Hub
   ```

2. **Start a local server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

4. **Make your changes**
   - Edit HTML in `index.html`
   - Edit styles in `styles.css`
   - Edit JavaScript in `script.js`

5. **Test thoroughly**
   - Test on multiple browsers
   - Test on different screen sizes
   - Test with keyboard navigation
   - Validate HTML

### Validation Tools

- **HTML Validator**: https://validator.w3.org/
- **CSS Validator**: https://jigsaw.w3.org/css-validator/
- **Accessibility Checker**: Use browser DevTools accessibility panel
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

### Common Tasks

#### Adding a New Section

1. Add HTML in `index.html`:
   ```html
   <section id="new-section" class="new-section" aria-labelledby="new-heading">
       <div class="container">
           <h2 id="new-heading">Section Title</h2>
           <!-- Content here -->
       </div>
   </section>
   ```

2. Add styles in `styles.css`:
   ```css
   .new-section {
       padding: var(--spacing-xxl) 0;
       background-color: var(--bg-secondary);
   }
   ```

3. Add navigation link in header:
   ```html
   <li><a href="#new-section">New Section</a></li>
   ```

#### Changing Colors

Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2563eb;  /* Your color */
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
}
```

#### Adding Images

1. Add image with proper attributes:
   ```html
   <img src="images/photo.jpg" 
        alt="Descriptive text" 
        loading="lazy"
        width="800"
        height="600">
   ```

2. Create `images` directory if needed
3. Add to `.gitignore` if files are large

### Git Workflow

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request on GitHub

### Pull Request Guidelines

- Provide a clear description of changes
- Reference any related issues
- Include screenshots for visual changes
- Ensure all tests pass
- Keep changes focused and atomic
- Update documentation if needed

### Bug Reports

When reporting bugs, include:
- Browser and version
- Device and screen size
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console errors if any

### Feature Requests

When suggesting features:
- Describe the use case
- Explain the benefit
- Consider accessibility impact
- Suggest implementation approach

## Questions?

If you have questions, please:
- Check existing issues
- Review the README.md
- Open a new issue with the "question" label

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow
- Maintain a welcoming community

Thank you for contributing to Spring Minds! 🌱
