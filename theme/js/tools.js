// ============================================
// Tools Management Module
// ============================================

const Tools = {
    // Default tools list
    DEFAULT_TOOLS: [
        {
            id: 1,
            name: 'Word Counter',
            description: 'শব্দ গণনা করুন সহজে',
            icon: '📊',
            url: '#tool-word-counter'
        },
        {
            id: 2,
            name: 'Text to Speech',
            description: 'টেক্সট কে ভয়েসে রূপান্তর করুন',
            icon: '🔊',
            url: '#tool-text-speech'
        },
        {
            id: 3,
            name: 'QR Code Generator',
            description: 'QR কোড তৈরি করুন মুহূর্তে',
            icon: '📱',
            url: '#tool-qr-generator'
        },
        {
            id: 4,
            name: 'JSON Formatter',
            description: 'JSON ডেটা ফরম্যাট করুন',
            icon: '{}',
            url: '#tool-json-formatter'
        },
        {
            id: 5,
            name: 'Password Generator',
            description: 'শক্তিশালী পাসওয়ার্ড তৈরি করুন',
            icon: '🔐',
            url: '#tool-password-gen'
        },
        {
            id: 6,
            name: 'MD5 Hash',
            description: 'MD5 হ্যাশ জেনারেট করুন',
            icon: '🔗',
            url: '#tool-md5-hash'
        }
    ],
    
    // Get all tools
    getAll() {
        const savedTools = Storage.get('tools', this.DEFAULT_TOOLS);
        return savedTools.length > 0 ? savedTools : this.DEFAULT_TOOLS;
    },
    
    // Add new tool
    add(tool) {
        const tools = this.getAll();
        tool.id = Date.now();
        tools.push(tool);
        Storage.save('tools', tools);
        console.log('✅ Tool added:', tool.name);
        return tool;
    },
    
    // Remove tool by ID
    remove(toolId) {
        let tools = this.getAll();
        tools = tools.filter(t => t.id !== toolId);
        Storage.save('tools', tools);
        console.log('🗑️ Tool removed:', toolId);
    },
    
    // Update tool
    update(toolId, updates) {
        let tools = this.getAll();
        const index = tools.findIndex(t => t.id === toolId);
        if (index !== -1) {
            tools[index] = { ...tools[index], ...updates };
            Storage.save('tools', tools);
            console.log('✏️ Tool updated:', toolId);
            return tools[index];
        }
        return null;
    },
    
    // Get tool by ID
    getById(toolId) {
        return this.getAll().find(t => t.id === toolId);
    },
    
    // Render tools grid
    renderGrid() {
        const toolsGrid = document.getElementById('toolsGrid');
        if (!toolsGrid) return;
        
        const tools = this.getAll();
        toolsGrid.innerHTML = '';
        
        tools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <div class="tool-icon">${tool.icon}</div>
                <h3 class="tool-name">${tool.name}</h3>
                <p class="tool-desc">${tool.description}</p>
                <div class="tool-actions">
                    <button class="tool-btn" onclick="Tools.openTool(${tool.id})">খুলুন</button>
                </div>
            `;
            toolsGrid.appendChild(toolCard);
        });
    },
    
    // Open tool
    openTool(toolId) {
        const tool = this.getById(toolId);
        if (tool) {
            window.location.href = tool.url;
            console.log('🚀 Opening tool:', tool.name);
        }
    }
};

// Initialize tools
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Tools.renderGrid());
} else {
    Tools.renderGrid();
}
