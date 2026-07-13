// ============================================
// Storage & Persistence Module
// ============================================

const Storage = {
    // Prefixes for all stored data
    PREFIX: 'blogger_theme_',
    
    // Initialize storage
    init() {
        console.log('🗄️ Storage module initialized');
    },
    
    // Save data to localStorage
    save(key, value) {
        try {
            const storageKey = this.PREFIX + key;
            localStorage.setItem(storageKey, JSON.stringify(value));
            console.log(`✅ Saved: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error saving ${key}:`, error);
            return false;
        }
    },
    
    // Retrieve data from localStorage
    get(key, defaultValue = null) {
        try {
            const storageKey = this.PREFIX + key;
            const item = localStorage.getItem(storageKey);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`❌ Error retrieving ${key}:`, error);
            return defaultValue;
        }
    },
    
    // Remove specific data
    remove(key) {
        try {
            const storageKey = this.PREFIX + key;
            localStorage.removeItem(storageKey);
            console.log(`🗑️ Removed: ${key}`);
            return true;
        } catch (error) {
            console.error(`❌ Error removing ${key}:`, error);
            return false;
        }
    },
    
    // Clear all theme data
    clear() {
        try {
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith(this.PREFIX)) {
                    localStorage.removeItem(key);
                }
            });
            console.log('🧹 All theme data cleared');
            return true;
        } catch (error) {
            console.error('❌ Error clearing storage:', error);
            return false;
        }
    },
    
    // Export all settings as JSON
    exportSettings() {
        const settings = {};
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.PREFIX)) {
                const cleanKey = key.replace(this.PREFIX, '');
                settings[cleanKey] = this.get(cleanKey);
            }
        });
        return settings;
    },
    
    // Import settings from JSON
    importSettings(settings) {
        try {
            Object.keys(settings).forEach(key => {
                this.save(key, settings[key]);
            });
            console.log('📤 Settings imported successfully');
            return true;
        } catch (error) {
            console.error('❌ Error importing settings:', error);
            return false;
        }
    }
};

// Initialize storage on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Storage.init());
} else {
    Storage.init();
}
