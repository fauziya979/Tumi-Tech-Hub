/**
 * SPRING MINDS - JavaScript
 * Handles interactive functionality for the website
 */

(function() {
    'use strict';

    // ========================================
    // 1. MOBILE NAVIGATION TOGGLE
    // ========================================
    
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Update ARIA attribute
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // 2. SMOOTH SCROLLING FOR ANCHOR LINKS
    // ========================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hash or single #
            if (href === '#' || href === '') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                // Get the header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Set focus to the target section for accessibility
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
            }
        });
    });

    // ========================================
    // 3. FORM VALIDATION
    // ========================================
    
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission (in production, this would send to a server)
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    // ========================================
    // 4. NOTIFICATION SYSTEM
    // ========================================
    
    function showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.querySelector('.notification');
        
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'notification';
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'polite');
            document.body.appendChild(notification);
            
            // Add notification styles
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    padding: 1rem 1.5rem;
                    background-color: white;
                    border-radius: 0.375rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    z-index: 10000;
                    max-width: 400px;
                    opacity: 0;
                    transform: translateY(-20px);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                
                .notification.show {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .notification.success {
                    border-left: 4px solid #10b981;
                    color: #065f46;
                }
                
                .notification.error {
                    border-left: 4px solid #ef4444;
                    color: #991b1b;
                }
                
                .notification.info {
                    border-left: 4px solid #2563eb;
                    color: #1e40af;
                }
                
                @media (max-width: 768px) {
                    .notification {
                        left: 20px;
                        right: 20px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Set notification content and type
        notification.textContent = message;
        notification.className = `notification ${type}`;
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }

    // ========================================
    // 5. ACTIVE NAVIGATION HIGHLIGHT
    // ========================================
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${currentSection}`) {
                link.classList.add('active');
                link.style.color = 'var(--primary-color)';
            } else {
                link.style.color = '';
            }
        });
    }
    
    // Update active link on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        
        scrollTimeout = window.requestAnimationFrame(function() {
            updateActiveNavLink();
        });
    });
    
    // Initial update
    updateActiveNavLink();

    // ========================================
    // 6. ACCESSIBILITY ENHANCEMENTS
    // ========================================
    
    // Add keyboard navigation for cards
    const interactiveCards = document.querySelectorAll('.service-card, .workshop-item');
    
    interactiveCards.forEach(card => {
        // Make cards keyboard focusable if they contain interactive elements
        card.setAttribute('tabindex', '0');
    });

    // Trap focus in mobile menu when open
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        if (navMenu.classList.contains('active') && e.key === 'Escape') {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            navToggle.focus();
        }
    });

    // ========================================
    // 7. LAZY LOADING IMAGES (if any are added)
    // ========================================
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ========================================
    // 8. PERFORMANCE OPTIMIZATION
    // ========================================
    
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Use debounced version for resize events
    window.addEventListener('resize', debounce(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }, 250));

    // ========================================
    // 9. CONSOLE MESSAGE
    // ========================================
    
    console.log('%c🌱 Spring Minds', 'color: #2563eb; font-size: 24px; font-weight: bold;');
    console.log('%cEmpowering young minds through education and support', 'color: #10b981; font-size: 14px;');
    console.log('%cWebsite loaded successfully!', 'color: #6b7280; font-size: 12px;');

})();
