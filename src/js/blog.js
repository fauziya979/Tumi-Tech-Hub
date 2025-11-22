/**
 * Blog Page Interactive Functionality
 * Features: Search, Category Filtering, Load More, Social Sharing
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // DOM Elements
    const searchInput = document.getElementById('searchInput');
    const categoryCards = document.querySelectorAll('.category-card');
    const articleCards = document.querySelectorAll('.article-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const clearFiltersBtn = document.getElementById('clearFilters');
    const noResults = document.getElementById('noResults');
    const shareButtons = document.querySelectorAll('.share-btn');
    
    // State
    let currentSearchTerm = '';
    let activeCategory = '';
    let hiddenArticlesShown = false;

    // Initialize
    init();

    function init() {
        setupEventListeners();
        updateArticleDisplay();
    }

    function setupEventListeners() {
        // Search functionality
        searchInput.addEventListener('input', handleSearch);
        
        // Category filtering
        categoryCards.forEach(card => {
            card.addEventListener('click', handleCategoryClick);
        });
        
        // Load more functionality
        loadMoreBtn.addEventListener('click', handleLoadMore);
        
        // Clear filters
        clearFiltersBtn.addEventListener('click', handleClearFilters);
        
        // Social sharing
        shareButtons.forEach(btn => {
            btn.addEventListener('click', handleSocialShare);
        });
    }

    /**
     * Handle search input
     */
    function handleSearch(event) {
        currentSearchTerm = event.target.value.toLowerCase().trim();
        updateArticleDisplay();
        toggleClearFiltersBtn();
    }

    /**
     * Handle category card clicks
     */
    function handleCategoryClick(event) {
        const clickedCard = event.currentTarget;
        const category = clickedCard.dataset.category;
        
        // Remove active class from all category cards
        categoryCards.forEach(card => card.classList.remove('active'));
        
        // Toggle category selection
        if (activeCategory === category) {
            activeCategory = '';
        } else {
            activeCategory = category;
            clickedCard.classList.add('active');
        }
        
        updateArticleDisplay();
        toggleClearFiltersBtn();
    }

    /**
     * Handle load more button click
     */
    function handleLoadMore() {
        const hiddenArticles = document.querySelectorAll('.hidden-article');
        
        hiddenArticles.forEach(article => {
            article.style.display = 'block';
            article.classList.remove('hidden-article');
            article.classList.add('article-card');
        });
        
        hiddenArticlesShown = true;
        loadMoreBtn.style.display = 'none';
        
        // Re-apply current filters to newly shown articles
        updateArticleDisplay();
    }

    /**
     * Handle clear filters button click
     */
    function handleClearFilters() {
        // Reset search
        searchInput.value = '';
        currentSearchTerm = '';
        
        // Reset category
        activeCategory = '';
        categoryCards.forEach(card => card.classList.remove('active'));
        
        // Update display
        updateArticleDisplay();
        toggleClearFiltersBtn();
    }

    /**
     * Handle social share button clicks
     */
    function handleSocialShare(event) {
        event.preventDefault();
        const platform = event.currentTarget.dataset.platform;
        const articleCard = event.currentTarget.closest('.article-card');
        const articleTitle = articleCard.querySelector('.card-title').textContent;
        const currentUrl = window.location.href;
        
        let shareUrl = '';
        
        switch(platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(articleTitle + ' - ' + currentUrl)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    /**
     * Update article display based on current filters
     */
    function updateArticleDisplay() {
        let visibleCount = 0;
        
        articleCards.forEach(article => {
            const matchesSearch = doesArticleMatchSearch(article);
            const matchesCategory = doesArticleMatchCategory(article);
            
            if (matchesSearch && matchesCategory) {
                article.style.display = 'block';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
        
        // Update load more button visibility
        updateLoadMoreBtn();
    }

    /**
     * Check if article matches current search term
     */
    function doesArticleMatchSearch(article) {
        if (!currentSearchTerm) return true;
        
        const title = article.querySelector('.card-title').textContent.toLowerCase();
        const description = article.querySelector('.card-text').textContent.toLowerCase();
        const author = article.querySelector('.fa-user').parentNode.textContent.toLowerCase();
        
        return title.includes(currentSearchTerm) || 
               description.includes(currentSearchTerm) || 
               author.includes(currentSearchTerm);
    }

    /**
     * Check if article matches active category
     */
    function doesArticleMatchCategory(article) {
        if (!activeCategory) return true;
        
        return article.dataset.category === activeCategory;
    }

    /**
     * Update load more button visibility
     */
    function updateLoadMoreBtn() {
        const hiddenArticles = document.querySelectorAll('.hidden-article');
        
        if (hiddenArticles.length > 0 && !hiddenArticlesShown) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }

    /**
     * Toggle clear filters button visibility
     */
    function toggleClearFiltersBtn() {
        if (currentSearchTerm || activeCategory) {
            clearFiltersBtn.style.display = 'inline-block';
        } else {
            clearFiltersBtn.style.display = 'none';
        }
    }

    /**
     * Add smooth scroll behavior to anchor links
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /**
     * Add loading animation to article images
     */
    const articleImages = document.querySelectorAll('.card-img-top');
    articleImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            // Fallback image if original fails to load
            this.src = '../../Assets/images.jpeg/springminds remov img.png';
            this.alt = 'Spring Minds Default Image';
        });
    });

    /**
     * Add intersection observer for animations
     */
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe article cards for entrance animations
    document.querySelectorAll('.blog-article-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    /**
     * Newsletter subscription (placeholder)
     */
    const newsletterBtn = document.querySelector('footer .btn-light');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = this.previousElementSibling;
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Simulate subscription success
                this.textContent = 'Subscribed!';
                this.classList.add('btn-success');
                this.classList.remove('btn-light');
                emailInput.value = '';
                
                setTimeout(() => {
                    this.textContent = 'Subscribe';
                    this.classList.remove('btn-success');
                    this.classList.add('btn-light');
                }, 2000);
            } else {
                // Show error state
                emailInput.classList.add('is-invalid');
                setTimeout(() => {
                    emailInput.classList.remove('is-invalid');
                }, 2000);
            }
        });
    }

    /**
     * Email validation helper
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Add keyboard navigation support
     */
    document.addEventListener('keydown', function(e) {
        // ESC key clears filters
        if (e.key === 'Escape') {
            handleClearFilters();
        }
        
        // Enter key on category cards activates them
        if (e.key === 'Enter' && e.target.classList.contains('category-card')) {
            e.target.click();
        }
    });

    // Make category cards keyboard accessible
    categoryCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `Filter by ${card.querySelector('h5').textContent} category`);
    });

    console.log('Blog page interactive features initialized successfully!');
});