/**
 * Article Page Enhancements
 * Features: Scroll Progress Bar, Social Sharing, Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Create and initialize scroll progress bar
    createScrollProgressBar();
    
    // Initialize smooth scrolling for internal links
    initSmoothScrolling();
    
    // Initialize social sharing functionality
    initSocialSharing();
    
    // Add reading time calculation
    calculateReadingTime();
    
    // Initialize hover effects
    initHoverEffects();
});

/**
 * Creates a scroll progress bar at the top of the page
 */
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: rgba(195, 0, 71, 0.2);
        z-index: 9999;
    `;
    
    const progressFill = document.createElement('div');
    progressFill.style.cssText = `
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #c30047 0%, #8b0032 100%);
        transition: width 0.3s ease;
    `;
    
    progressBar.appendChild(progressFill);
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / documentHeight) * 100;
        
        progressFill.style.width = Math.min(scrollPercent, 100) + '%';
    });
}

/**
 * Initialize smooth scrolling for internal anchor links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Initialize social sharing functionality
 */
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('[data-share]');
    const currentUrl = encodeURIComponent(window.location.href);
    const pageTitle = encodeURIComponent(document.title);
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-share');
            let shareUrl = '';
            
            switch(platform) {
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${pageTitle}%20${currentUrl}`;
                    break;
                    
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
                    break;
                    
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
                    break;
                    
                case 'email':
                    shareUrl = `mailto:?subject=${pageTitle}&body=Check out this article: ${currentUrl}`;
                    break;
                    
                case 'copy':
                    copyToClipboard(window.location.href);
                    showCopySuccess(this);
                    return;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
    }
}

/**
 * Show copy success feedback
 */
function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    button.classList.add('btn-success');
    button.classList.remove('btn-outline-secondary');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('btn-success');
        button.classList.add('btn-outline-secondary');
    }, 2000);
}

/**
 * Calculate and display reading time
 */
function calculateReadingTime() {
    const article = document.querySelector('.article-content');
    if (!article) return;
    
    const text = article.textContent || article.innerText;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    // Update any reading time displays
    const readingTimeElements = document.querySelectorAll('[data-reading-time]');
    readingTimeElements.forEach(element => {
        element.textContent = `${readingTime} min read`;
    });
}

/**
 * Add hover effects to interactive elements
 */
function initHoverEffects() {
    // Back to blog button effect
    const backButton = document.querySelector('.back-to-blog');
    if (backButton) {
        backButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-3px)';
        });
        
        backButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    }
    
    // Card hover effects
    const cards = document.querySelectorAll('.related-articles .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        });
    });
}