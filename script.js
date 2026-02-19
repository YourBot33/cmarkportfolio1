// Matrix Rain Effect - Optimized for performance
class MatrixRain {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        this.characters = 'アイウエオカキクケコ0123456789';
        this.fontSize = 12;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }
    
    animate() {
        this.ctx.fillStyle = 'rgba(2, 2, 4, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = this.fontSize + 'px monospace';
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
            
            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Boot Sequence
const bootText = [
    "BIOS DATE 02/18/26 14:22:51",
    "CPU: Quantum Core @ 4.20GHz",
    "DETECTING PRIMARY MASTER ... OK",
    "LOADING KERNEL ...",
    "MOUNTING FILESYSTEMS ...",
    "INITIALIZING NETWORK ...",
    "ACCESS GRANTED",
    "WELCOME, CHRISTIAN MARK"
];

function runBootSequence() {
    const bootContent = document.getElementById('boot-content');
    const bootScreen = document.getElementById('boot-screen');
    const mainContainer = document.getElementById('main-container');
    let lineIndex = 0;
    
    function addLine() {
        if (lineIndex < bootText.length) {
            const line = document.createElement('div');
            line.className = 'boot-line';
            line.textContent = bootText[lineIndex];
            line.style.animationDelay = '0s';
            bootContent.appendChild(line);
            lineIndex++;
            setTimeout(addLine, Math.random() * 200 + 100);
        } else {
            setTimeout(() => {
                bootScreen.style.transition = 'opacity 0.5s';
                bootScreen.style.opacity = '0';
                setTimeout(() => {
                    bootScreen.style.display = 'none';
                    mainContainer.style.opacity = '1';
                }, 500);
            }, 600);
        }
    }
    
    addLine();
}

// Tab Switching
function showTab(tabName, clickedBtn) {
    const panels = document.getElementsByClassName('content-panel');
    const buttons = document.getElementsByClassName('nav-btn');
    
    for (let panel of panels) {
        panel.classList.remove('active');
    }
    
    for (let btn of buttons) {
        btn.classList.remove('active');
    }
    
    const selectedPanel = document.getElementById(tabName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
        const typewriters = selectedPanel.querySelectorAll('.typewriter');
        typewriters.forEach((el) => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = '';
        });
    }
    
    clickedBtn.classList.add('active');
    
    if (window.innerWidth < 768) {
        const navContainer = document.querySelector('.nav-container');
        const rect = navContainer.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        window.scrollTo({
            top: scrollTop + rect.top - 10,
            behavior: 'smooth'
        });
    }
}

// Generate Floating Particles - Reduced for mobile
function createParticles() {
    const container = document.getElementById('particles');
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.opacity = Math.random() * 0.4 + 0.1;
        container.appendChild(particle);
    }
}

// Binary Rain for C Language Panel
function createBinaryRain() {
    const container = document.getElementById('binary-rain');
    if (!container) return;
    
    if (window.innerWidth < 768) return;
    
    setInterval(() => {
        const binary = document.createElement('div');
        binary.textContent = Math.random() > 0.5 ? '1' : '0';
        binary.style.position = 'absolute';
        binary.style.left = Math.random() * 100 + '%';
        binary.style.top = '-20px';
        binary.style.animation = 'fall 2s linear';
        binary.style.opacity = '0.3';
        container.appendChild(binary);
        
        setTimeout(() => binary.remove(), 2000);
    }, 200);
}

// Clock and System Stats
function updateStats() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
    
    document.getElementById('cpu-usage').textContent = Math.floor(Math.random() * 20 + 5);
    document.getElementById('mem-usage').textContent = Math.floor(Math.random() * 200 + 300);
}

// Handle resize
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const container = document.getElementById('particles');
        container.innerHTML = '';
        createParticles();
    }, 250);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Start Matrix Rain
    const canvas = document.getElementById('matrix-canvas');
    new MatrixRain(canvas);
    
    // Run boot sequence
    runBootSequence();
    
    // Create particles
    createParticles();
    
    // Create binary rain
    createBinaryRain();
    
    // Start stats update
    setInterval(updateStats, 2000);
    updateStats();
    
    // Handle resize
    window.addEventListener('resize', handleResize);
    
    // Add random glitch to name occasionally
    const name = document.querySelector('.profile-name');
    setInterval(() => {
        if (Math.random() > 0.97) {
            name.style.animation = 'none';
            setTimeout(() => {
                name.style.animation = '';
            }, 100);
        }
    }, 3000);
});

// Add falling animation for binary rain
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to { transform: translateY(300px); opacity: 0; }
    }
`;
document.head.appendChild(style);
// ============================================
// FIREBASE REAL-TIME COMMENTS SYSTEM
// ============================================

// Your Firebase config (get this from Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyCdBHQIHZGOkYXH1Cn2Xtz9am4C-sBS16c",
    authDomain: "portfolio-5a458.firebaseapp.com",
    databaseURL: "https://portfolio-5a458-default-rtdb.firebaseio.com",
    projectId: "portfolio-5a458",
    storageBucket: "portfolio-5a458.firebasestorage.app",
    messagingSenderId: "1083197428694",
    appId: "1:1083197428694:web:d912bcf6152462db210a77"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const commentsRef = database.ref('comments');

const USER_KEY = 'christian_mark_user';

// Initialize comments system
function initComments() {
    checkUserSession();
    setupRealtimeListener();
    
    // Enter key to send
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                postComment();
            }
        });
    }
}

// Real-time listener - THIS MAKES IT LIVE FOR ALL USERS
function setupRealtimeListener() {
    commentsRef.on('value', (snapshot) => {
        const comments = [];
        snapshot.forEach((childSnapshot) => {
            comments.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        
        // Sort by timestamp
        comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        
        renderAllComments(comments);
    });
}

// Check if user has existing session
function checkUserSession() {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
        showChatInterface(user);
    }
}

// Set username and initialize session
function setUsername() {
    const input = document.getElementById('username-input');
    const username = input.value.trim().toUpperCase();
    
    if (username.length < 2) {
        alert('ERROR: USERNAME MUST BE AT LEAST 2 CHARACTERS');
        return;
    }
    
    if (username.length > 20) {
        alert('ERROR: USERNAME TOO LONG');
        return;
    }
    
    localStorage.setItem(USER_KEY, username);
    showChatInterface(username);
    
    // Announce connection
    const connectedRef = database.ref('.info/connected');
    connectedRef.on('value', (snap) => {
        if (snap.val() === true) {
            addSystemMessage(`OPERATIVE ${username} CONNECTED`);
        }
    });
}

// Show chat interface
function showChatInterface(username) {
    document.getElementById('user-setup').style.display = 'none';
    document.getElementById('chat-interface').style.display = 'flex';
    document.getElementById('current-user').textContent = username;
    document.getElementById('input-user').textContent = username;
}

// Logout user
function logoutUser() {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
        addSystemMessage(`OPERATIVE ${user} DISCONNECTED`);
    }
    localStorage.removeItem(USER_KEY);
    document.getElementById('user-setup').style.display = 'block';
    document.getElementById('chat-interface').style.display = 'none';
    document.getElementById('username-input').value = '';
}

// Post new comment to Firebase
function postComment() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    const user = localStorage.getItem(USER_KEY);
    
    if (!user) {
        alert('ERROR: SESSION EXPIRED. PLEASE RECONNECT.');
        return;
    }
    
    if (!text) return;
    
    if (text.length > 500) {
        alert('ERROR: MESSAGE EXCEEDS 500 CHARACTER LIMIT');
        return;
    }
    
    const comment = {
        author: user,
        text: text,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.slice(0, 50) // Simple fingerprint
    };
    
    // Push to Firebase - automatically syncs to ALL users!
    commentsRef.push(comment);
    
    input.value = '';
    
    // Scroll to bottom
    const container = document.getElementById('messages-container');
    setTimeout(() => {
        container.scrollTop = container.scrollHeight;
    }, 100);
}

// Check if current user owns this comment
function isOwnComment(comment) {
    const currentUser = localStorage.getItem(USER_KEY);
    if (!currentUser) return false;
    return comment.author === currentUser;
}

// Render all comments
function renderAllComments(comments) {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    // Keep only system messages
    const systemMessages = Array.from(container.querySelectorAll('.system-message'));
    container.innerHTML = '';
    systemMessages.forEach(msg => container.appendChild(msg));
    
    if (comments.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.innerHTML = '> NO TRANSMISSIONS FOUND<br>> BE THE FIRST TO BROADCAST';
        container.appendChild(empty);
    } else {
        comments.forEach(comment => renderComment(comment, false));
    }
    
    updateMessageCount(comments.length);
}

// Render single comment
function renderComment(comment, isNew = false) {
    const container = document.getElementById('messages-container');
    const emptyState = container.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    // Check if already rendered
    if (document.getElementById(`msg-${comment.id}`)) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.id = `msg-${comment.id}`;
    
    if (isOwnComment(comment)) {
        messageDiv.classList.add('own-message');
    }
    
    if (isNew) {
        messageDiv.style.animation = 'panelOpen 0.3s ease';
    }
    
    const date = new Date(comment.timestamp);
    const timeStr = date.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    let html = `
        <div class="message-header">
            <span class="message-author">${escapeHtml(comment.author)}</span>
            <span class="timestamp">[${timeStr}]</span>
        </div>
        <div class="message-text">${escapeHtml(comment.text)}</div>
    `;
    
    // Only show delete button for own messages
    if (isOwnComment(comment)) {
        html += `
            <div class="message-actions">
                <button onclick="confirmDelete('${comment.id}')" class="delete-btn">[DELETE_TRANSMISSION]</button>
            </div>
        `;
    }
    
    messageDiv.innerHTML = html;
    container.appendChild(messageDiv);
    
    // Auto-scroll if near bottom
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
    if (isNearBottom) {
        container.scrollTop = container.scrollHeight;
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Confirm delete modal
function confirmDelete(commentId) {
    const modal = document.createElement('div');
    modal.className = 'delete-modal';
    modal.id = 'delete-modal';
    modal.innerHTML = `
        <div class="delete-modal-content">
            <h3>⚠️ CONFIRM DELETION</h3>
            <p>Are you sure you want to permanently delete this transmission? This action cannot be undone.</p>
            <div class="modal-actions">
                <button onclick="deleteComment('${commentId}')" class="modal-btn confirm">EXECUTE</button>
                <button onclick="closeModal()" class="modal-btn cancel">ABORT</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('delete-modal');
    if (modal) modal.remove();
}

// Delete comment from Firebase
function deleteComment(commentId) {
    const user = localStorage.getItem(USER_KEY);
    
    // Verify ownership before deleting
    commentsRef.child(commentId).once('value', (snapshot) => {
        const comment = snapshot.val();
        if (comment && comment.author === user) {
            commentsRef.child(commentId).remove()
                .then(() => {
                    closeModal();
                    addSystemMessage('TRANSMISSION DELETED SUCCESSFULLY');
                })
                .catch((error) => {
                    alert('ERROR: ' + error.message);
                });
        } else {
            alert('ERROR: UNAUTHORIZED DELETION ATTEMPT');
            closeModal();
        }
    });
}

// Add system message (local only)
function addSystemMessage(text) {
    const container = document.getElementById('messages-container');
    if (!container) return;
    
    const sysMsg = document.createElement('div');
    sysMsg.className = 'system-message';
    sysMsg.innerHTML = `
        <span class="timestamp">[SYSTEM]</span>
        <span class="message-text">${text}</span>
    `;
    container.appendChild(sysMsg);
    
    container.scrollTop = container.scrollHeight;
    
    // Remove old system messages
    const oldSystems = container.querySelectorAll('.system-message');
    if (oldSystems.length > 5) {
        oldSystems[0].remove();
    }
}

// Update message count display
function updateMessageCount(count) {
    const el = document.getElementById('message-count');
    if (el) el.textContent = count;
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initComments();
});
