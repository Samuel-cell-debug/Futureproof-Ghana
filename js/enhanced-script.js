// Futureproof Ghana Enhanced Functionality
class FutureproofGhanaEnhanced {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        // Certificate handling moved to separate module
        this.setupGalleryFilters();
        this.setupAuthentication();
        this.loadUserData();
        this.hideLoadingSpinner();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks) {
                        navLinks.classList.remove('active');
                        const icon = mobileMenuBtn?.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-times');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            });
        });

        // Back to top button
        const backToTopBtn = document.getElementById('back-to-top');
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        // Challenge join buttons
        document.querySelectorAll('.join-challenge').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const challengeTitle = e.target.closest('.challenge-card').querySelector('.challenge-title').textContent;
                this.joinChallenge(challengeTitle);
            });
        });

        // Animate stats
        this.animateStats();
    }

    setupCertificateGenerator() {
        const certificateForm = document.getElementById('certificate-form');
        const downloadBtn = document.getElementById('download-certificate');
        
        if (certificateForm) {
            // Real-time preview updates
            document.getElementById('certificate-name').addEventListener('input', (e) => {
                document.getElementById('preview-name').textContent = e.target.value || '[Your Name]';
            });
            
            document.getElementById('certificate-badge').addEventListener('change', (e) => {
                const badgeText = e.target.options[e.target.selectedIndex].text;
                document.getElementById('preview-badge').textContent = badgeText || '[Achievement Badge]';
            });
            
            document.getElementById('certificate-date').addEventListener('change', (e) => {
                const date = new Date(e.target.value);
                document.getElementById('preview-date').textContent = e.target.value ? date.toLocaleDateString() : '[Date]';
            });
            
            // Form submission
            certificateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateCertificate();
            });
            
            // Download functionality
            downloadBtn.addEventListener('click', () => {
                this.downloadCertificate();
            });
        }
    }

    generateCertificate() {
        const formData = new FormData(document.getElementById('certificate-form'));
        const data = Object.fromEntries(formData);
        
        if (!data['certificate-name'] || !data['certificate-badge'] || !data['certificate-date']) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Simulate certificate generation
        const submitBtn = document.querySelector('#certificate-form button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Generating...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            this.showNotification('Certificate generated successfully! Click "Download Certificate" to save it.', 'success');
            document.getElementById('download-certificate').style.display = 'inline-block';
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Save to user's certificates if logged in
            if (this.currentUser) {
                this.saveUserCertificate(data);
            }
        }, 2000);
    }

    downloadCertificate() {
        this.showNotification('Preparing certificate download...', 'info');
        
        // Simulate download process
        setTimeout(() => {
            const certificateData = {
                name: document.getElementById('certificate-name').value,
                badge: document.getElementById('certificate-badge').value,
                date: document.getElementById('certificate-date').value,
                description: document.getElementById('certificate-description').value
            };
            
            // Create a simple text certificate
            const certificateText = `
FUTUREPROOF GHANA
CERTIFICATE OF ACHIEVEMENT

This certifies that
${certificateData.name}

Has successfully earned the
${certificateData.badge} Badge

For outstanding contributions to community development
and environmental sustainability in Ghana.

Date: ${new Date(certificateData.date).toLocaleDateString()}
${certificateData.description ? `\nDescription: ${certificateData.description}` : ''}

Futureproof Ghana - Small Actions, Big Impact
            `.trim();
            
            const blob = new Blob([certificateText], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `futureproof-certificate-${certificateData.name.replace(/\s+/g, '-')}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            this.showNotification('Certificate downloaded successfully!', 'success');
        }, 1000);
    }

    setupGalleryFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    setupAuthentication() {
        // Login modal functionality
        const loginModal = document.getElementById('login-modal');
        const loginTrigger = document.getElementById('login-trigger');
        const closeModal = document.querySelector('.close-modal');
        const loginForm = document.getElementById('login-form');
        
        if (loginTrigger) {
            loginTrigger.addEventListener('click', (e) => {
                e.preventDefault();
                this.showLoginModal();
            });
        }
        
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                this.hideLoginModal();
            });
        }
        
        // Close modal when clicking outside
        if (loginModal) {
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    this.hideLoginModal();
                }
            });
        }
        
        // Login form submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }
    }

    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) modal.style.display = 'flex';
    }

    hideLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) modal.style.display = 'none';
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simulate API call
        this.showNotification('Signing in...', 'info');
        
        setTimeout(() => {
            if (email && password) {
                this.currentUser = {
                    email: email,
                    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                    joined: new Date().toISOString()
                };
                
                this.saveUserData();
                this.updateUIForLoggedInUser();
                this.hideLoginModal();
                this.showNotification(`Welcome back, ${this.currentUser.name}!`, 'success');
                
                // Clear form
                document.getElementById('login-form').reset();
            } else {
                this.showNotification('Please enter valid credentials', 'error');
            }
        }, 1500);
    }

    loadUserData() {
        const savedUser = localStorage.getItem('futureproofUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }
    }

    saveUserData() {
        if (this.currentUser) {
            localStorage.setItem('futureproofUser', JSON.stringify(this.currentUser));
        }
    }

    updateUIForLoggedInUser() {
        const loginTrigger = document.getElementById('login-trigger');
        if (loginTrigger) {
            loginTrigger.innerHTML = `<i class="fas fa-user"></i> ${this.currentUser.name}`;
            loginTrigger.style.fontWeight = '600';
            loginTrigger.style.color = 'var(--primary)';
        }
    }

    updateUIForLoggedOutUser() {
        const loginTrigger = document.getElementById('login-trigger');
        if (loginTrigger) {
            loginTrigger.innerHTML = 'Login';
            loginTrigger.style.fontWeight = '500';
            loginTrigger.style.color = '';
        }
    }

    joinChallenge(challengeTitle) {
        if (!this.currentUser) {
            this.showNotification('Please login to join challenges', 'error');
            this.showLoginModal();
            return;
        }
        
        this.showNotification(`Joined "${challengeTitle}" successfully!`, 'success');
        
        // Save to user's challenges
        const userChallenges = JSON.parse(localStorage.getItem('userChallenges') || '{}');
        if (!userChallenges[this.currentUser.email]) {
            userChallenges[this.currentUser.email] = [];
        }
        
        userChallenges[this.currentUser.email].push({
            title: challengeTitle,
            joinedAt: new Date().toISOString(),
            status: 'active'
        });
        
        localStorage.setItem('userChallenges', JSON.stringify(userChallenges));
    }

    saveUserCertificate(certificateData) {
        if (!this.currentUser) return;
        
        const userCertificates = JSON.parse(localStorage.getItem('userCertificates') || '{}');
        if (!userCertificates[this.currentUser.email]) {
            userCertificates[this.currentUser.email] = [];
        }
        
        userCertificates[this.currentUser.email].push({
            ...certificateData,
            id: Date.now(),
            generatedAt: new Date().toISOString()
        });
        
        localStorage.setItem('userCertificates', JSON.stringify(userCertificates));
    }

    animateStats() {
        const statElements = document.querySelectorAll('.stat-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateValue(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statElements.forEach(stat => observer.observe(stat));
    }

    animateValue(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    hideLoadingSpinner() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const spinner = document.getElementById('loading-spinner');
                if (spinner) {
                    spinner.classList.add('hidden');
                    setTimeout(() => {
                        spinner.remove();
                    }, 500);
                }
            }, 1000);
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Add CSS animations for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .project-card {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    new FutureproofGhanaEnhanced();
});
