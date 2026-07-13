// ============================================
// Main Application Module
// ============================================

const App = {
    // Initialize application
    init() {
        console.log('🚀 Advanced Blogger Theme - Initializing...');
        
        // Set current year
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Initialize all modules
        this.setupThemeToggle();
        this.setupCustomizer();
        this.setupNavigation();
        this.setupSocialLinks();
        this.setupScrollAnimations();
        this.setupPerformanceOptimization();
        
        console.log('✅ Application ready!');
    },
    
    // Setup theme toggle
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isDark = document.body.classList.toggle('dark-theme');
                const settings = Customizer.loadSettings();
                settings.theme = isDark ? 'dark' : 'default';
                Storage.save('settings', settings);
                console.log('🌙 Theme toggled:', isDark ? 'dark' : 'light');
            });
        }
    },
    
    // Setup customizer panel
    setupCustomizer() {
        const customizerToggle = document.getElementById('customizerToggle');
        const customizerPanel = document.getElementById('customizerPanel');
        
        if (customizerToggle && customizerPanel) {
            window.openCustomizer = () => {
                customizerPanel.classList.add('active');
                document.body.classList.add('no-scroll');
            };
            
            window.closeCustomizer = () => {
                customizerPanel.classList.remove('active');
                document.body.classList.remove('no-scroll');
            };
        }
    },
    
    // Setup navigation
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    },
    
    // Setup social links
    setupSocialLinks() {
        const renderSocialLinks = () => {
            const settings = Customizer.loadSettings();
            const socialLinks = settings.socialLinks;
            
            const socialLinksContainer = document.getElementById('socialLinks');
            const footerSocial = document.getElementById('footerSocial');
            
            const platforms = [
                { name: 'facebook', icon: '👍', color: '#1877F2' },
                { name: 'twitter', icon: '𝕏', color: '#000000' },
                { name: 'instagram', icon: '📷', color: '#E4405F' },
                { name: 'youtube', icon: '▶️', color: '#FF0000' },
                { name: 'linkedin', icon: '💼', color: '#0A66C2' }
            ];
            
            if (socialLinksContainer) {
                socialLinksContainer.innerHTML = '';
                platforms.forEach(platform => {
                    if (socialLinks[platform.name]) {
                        const link = document.createElement('a');
                        link.href = socialLinks[platform.name];
                        link.target = '_blank';
                        link.className = 'social-link';
                        link.textContent = platform.icon;
                        link.style.backgroundColor = platform.color;
                        socialLinksContainer.appendChild(link);
                    }
                });
            }
            
            if (footerSocial) {
                footerSocial.innerHTML = '';
                platforms.forEach(platform => {
                    if (socialLinks[platform.name]) {
                        const link = document.createElement('a');
                        link.href = socialLinks[platform.name];
                        link.target = '_blank';
                        link.className = 'social-link';
                        link.textContent = platform.icon;
                        link.style.backgroundColor = platform.color;
                        footerSocial.appendChild(link);
                    }
                });
            }
        };
        
        window.renderSocialLinks = renderSocialLinks;
        renderSocialLinks();
    },
    
    // Setup scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.tool-card, .post-card, .section-title').forEach(el => {
            observer.observe(el);
        });
    },
    
    // Setup performance optimization
    setupPerformanceOptimization() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.src = entry.target.dataset.src;
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        }
        
        // Performance monitoring
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page load time: ${pageLoadTime}ms`);
            });
        }
    }
};

// Tool management functions
window.addTool = function() {
    const toolName = document.getElementById('toolName').value;
    const toolUrl = document.getElementById('toolUrl').value;
    const toolIcon = document.getElementById('toolIcon').value;
    
    if (!toolName || !toolUrl || !toolIcon) {
        alert('⚠️ সব ফিল্ড পূরণ করুন!');
        return;
    }
    
    const tool = {
        name: toolName,
        url: toolUrl,
        icon: toolIcon,
        description: 'Custom Tool'
    };
    
    Tools.add(tool);
    Tools.renderGrid();
    
    // Clear inputs
    document.getElementById('toolName').value = '';
    document.getElementById('toolUrl').value = '';
    document.getElementById('toolIcon').value = '';
    
    // Update tools list in customizer
    updateToolsList();
    alert('✅ টুল যোগ করা হয়েছে!');
};

window.updateToolsList = function() {
    const toolsList = document.getElementById('toolsList');
    if (!toolsList) return;
    
    const tools = Tools.getAll();
    toolsList.innerHTML = '';
    
    tools.forEach(tool => {
        if (tool.id > 6) { // Only show custom tools
            const toolItem = document.createElement('div');
            toolItem.className = 'tool-item';
            toolItem.innerHTML = `
                <span>${tool.icon} ${tool.name}</span>
                <button class="tool-remove-btn" onclick="removeTool(${tool.id})">অপসারণ</button>
            `;
            toolsList.appendChild(toolItem);
        }
    });
};

window.removeTool = function(toolId) {
    if (confirm('এই টুলটি সরাতে চান?')) {
        Tools.remove(toolId);
        Tools.renderGrid();
        updateToolsList();
        alert('✅ টুল সরানো হয়েছে!');
    }
};

// Scroll to section
window.scrollToSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

// Service Worker registration for offline support
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('⚠️ Service Worker registration failed:', err));
    });
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => App.init());
} else {
    App.init();
}

// Performance logging
console.log('%c🎨 Advanced Blogger Theme v1.0', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cডেভেলপড বাই: Blogger Theme Team', 'color: #ec4899; font-size: 12px;');
console.log('%cসব ধরনের কাস্টমাইজেশন সম্ভব - কোড এডিট ছাড়াই!', 'color: #22c55e; font-size: 12px;');
