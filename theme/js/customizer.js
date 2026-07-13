// ============================================
// Theme Customizer Module
// ============================================

const Customizer = {
    // Theme options
    THEMES: {
        default: {
            name: 'ডিফল্ট',
            primary: '#6366f1',
            secondary: '#ec4899'
        },
        dark: {
            name: 'ডার্ক',
            primary: '#818cf8',
            secondary: '#f472b6'
        },
        ocean: {
            name: 'সমুদ্র',
            primary: '#0369a1',
            secondary: '#06b6d4'
        },
        sunset: {
            name: 'সূর্যাস্ত',
            primary: '#ea580c',
            secondary: '#f97316'
        },
        forest: {
            name: 'বন',
            primary: '#15803d',
            secondary: '#22c55e'
        }
    },
    
    // Default settings
    DEFAULT_SETTINGS: {
        theme: 'default',
        siteName: 'Tools Hub',
        siteTagline: 'আপনার দৈনন্দিন সব টুলস এক জায়গায়',
        fontSize: 16,
        adsEnabled: true,
        sidebarEnabled: false,
        footerEnabled: true,
        socialLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            youtube: '',
            linkedin: ''
        },
        adsenseCode: ''
    },
    
    // Initialize customizer
    init() {
        this.loadSettings();
        this.applySettings();
        this.setupEventListeners();
        console.log('🎨 Customizer initialized');
    },
    
    // Load settings from storage
    loadSettings() {
        const settings = Storage.get('settings', this.DEFAULT_SETTINGS);
        return settings;
    },
    
    // Save settings to storage
    saveSettings(settings) {
        Storage.save('settings', settings);
        this.applySettings();
    },
    
    // Apply settings to the page
    applySettings() {
        const settings = this.loadSettings();
        
        // Apply theme
        if (settings.theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Apply site name and tagline
        const siteLogo = document.getElementById('siteLogo');
        const siteTagline = document.getElementById('siteTagline');
        if (siteLogo) siteLogo.textContent = '🎨 ' + settings.siteName;
        if (siteTagline) siteTagline.textContent = settings.siteTagline;
        
        // Apply font size
        document.documentElement.style.fontSize = settings.fontSize + 'px';
        
        // Toggle ads
        const adSpaces = document.querySelectorAll('.ad-space');
        adSpaces.forEach(ad => {
            ad.style.display = settings.adsEnabled ? 'flex' : 'none';
        });
        
        // Toggle footer
        const footer = document.getElementById('mainFooter');
        if (footer) {
            footer.style.display = settings.footerEnabled ? 'block' : 'none';
        }
        
        console.log('✅ Settings applied');
    },
    
    // Setup event listeners
    setupEventListeners() {
        // Update site info inputs
        const siteName = document.getElementById('siteName');
        const taglineInput = document.getElementById('siteTaglineInput');
        
        if (siteName) {
            siteName.value = this.loadSettings().siteName;
        }
        if (taglineInput) {
            taglineInput.value = this.loadSettings().siteTagline;
        }
        
        // Load social links
        const socialLinks = this.loadSettings().socialLinks;
        document.getElementById('facebookUrl').value = socialLinks.facebook || '';
        document.getElementById('twitterUrl').value = socialLinks.twitter || '';
        document.getElementById('instagramUrl').value = socialLinks.instagram || '';
        document.getElementById('youtubeUrl').value = socialLinks.youtube || '';
        document.getElementById('linkedinUrl').value = socialLinks.linkedin || '';
    }
};

// Global functions for HTML
window.applyTheme = function(themeName) {
    const settings = Customizer.loadSettings();
    settings.theme = themeName;
    Customizer.saveSettings(settings);
    
    // Update theme indicator
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-theme="${themeName}"]`).classList.add('active');
    
    console.log('🎨 Theme applied:', themeName);
};

window.toggleAds = function() {
    const toggle = document.getElementById('adsToggle');
    const settings = Customizer.loadSettings();
    settings.adsEnabled = toggle.checked;
    Customizer.saveSettings(settings);
};

window.toggleSidebar = function() {
    const toggle = document.getElementById('sidebarToggle');
    const settings = Customizer.loadSettings();
    settings.sidebarEnabled = toggle.checked;
    Customizer.saveSettings(settings);
};

window.toggleFooter = function() {
    const toggle = document.getElementById('footerToggle');
    const settings = Customizer.loadSettings();
    settings.footerEnabled = toggle.checked;
    Customizer.saveSettings(settings);
};

window.changeFontSize = function(size) {
    const display = document.getElementById('fontSizeDisplay');
    if (display) display.textContent = size;
    
    const settings = Customizer.loadSettings();
    settings.fontSize = parseInt(size);
    Customizer.saveSettings(settings);
};

window.updateSiteInfo = function() {
    const siteName = document.getElementById('siteName').value;
    const tagline = document.getElementById('siteTaglineInput').value;
    
    const settings = Customizer.loadSettings();
    settings.siteName = siteName;
    settings.siteTagline = tagline;
    Customizer.saveSettings(settings);
    
    alert('✅ সাইট তথ্য আপডেট হয়েছে!');
};

window.saveSocialLinks = function() {
    const settings = Customizer.loadSettings();
    settings.socialLinks = {
        facebook: document.getElementById('facebookUrl').value,
        twitter: document.getElementById('twitterUrl').value,
        instagram: document.getElementById('instagramUrl').value,
        youtube: document.getElementById('youtubeUrl').value,
        linkedin: document.getElementById('linkedinUrl').value
    };
    Customizer.saveSettings(settings);
    renderSocialLinks();
    alert('✅ সোশ্যাল লিংক সংরক্ষিত হয়েছে!');
};

window.saveAdCode = function() {
    const adsenseCode = document.getElementById('adsenseCode').value;
    const settings = Customizer.loadSettings();
    settings.adsenseCode = adsenseCode;
    Customizer.saveSettings(settings);
    alert('✅ AdSense কোড সংরক্ষিত হয়েছে!');
};

window.resetAllSettings = function() {
    if (confirm('⚠️ সব সেটিংস রিসেট করবেন? এটি পূর্বাবস্থায় ফিরিয়ে নেবে।')) {
        Storage.clear();
        Customizer.init();
        Tools.renderGrid();
        alert('✅ সব সেটিংস রিসেট হয়েছে!');
        location.reload();
    }
};

window.exportSettings = function() {
    const settings = Storage.exportSettings();
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blogger-theme-settings.json';
    link.click();
    console.log('📥 Settings exported');
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Customizer.init());
} else {
    Customizer.init();
}
