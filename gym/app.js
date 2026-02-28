// EliteFit Gym Management System - JavaScript Application

// Application State
const state = {
    currentUser: null,
    selectedPlan: null,
    API_BASE: 'http://localhost:3000/api',
    schedule: []
};

// DOM Elements
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const scheduleGrid = document.getElementById('schedule-grid');
const selectedPlanDisplay = document.getElementById('selected-plan');
const payNowBtn = document.getElementById('pay-now-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const membershipForm = document.getElementById('membership-form');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initForms();
    loadSchedule();
    checkAuthState();
    setupEventListeners();
});

// API Integration Functions
async function apiCall(endpoint, method = 'GET', data = null, requiresAuth = false) {
    const url = `${state.API_BASE}${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        }
    };

    if (requiresAuth) {
        const token = localStorage.getItem('elitefit_token');
        if (!token) {
            throw new Error('Authentication required');
        }
        options.headers.Authorization = `Bearer ${token}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
    }

    return response.json();
}

// Enhanced Authentication Functions
async function handleLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const result = await apiCall('/auth/login', 'POST', { email, password });
        
        state.currentUser = result.user;
        localStorage.setItem('elitefit_current_user', JSON.stringify(result.user));
        localStorage.setItem('elitefit_token', result.token);
        
        hideModal('login-modal');
        updateAuthUI();
        showToast('Welcome back!', 'success');
    } catch (error) {
        showToast(error.message || 'Invalid email or password', 'error');
    }
}

async function handleSignup() {
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const phone = document.getElementById('phone').value;
    const gender = document.getElementById('gender').value;

    try {
        const result = await apiCall('/auth/register', 'POST', {
            firstName, lastName, email, password, phone, gender
        });
        
        state.currentUser = result.user;
        localStorage.setItem('elitefit_current_user', JSON.stringify(result.user));
        localStorage.setItem('elitefit_token', result.token);
        
        hideModal('signup-modal');
        updateAuthUI();
        showToast('Account created successfully!', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function handleLogout() {
    state.currentUser = null;
    localStorage.removeItem('elitefit_current_user');
    localStorage.removeItem('elitefit_token');
    updateAuthUI();
    showToast('Logged out successfully', 'success');
}

async function checkAuthState() {
    const token = localStorage.getItem('elitefit_token');
    if (token) {
        try {
            const result = await apiCall('/auth/me', 'GET', null, true);
            state.currentUser = result.user;
            updateAuthUI();
        } catch (error) {
            localStorage.removeItem('elitefit_token');
            localStorage.removeItem('elitefit_current_user');
            updateAuthUI();
        }
    }
}

// Enhanced Membership Management
async function loadMembershipPlans() {
    try {
        const plans = await apiCall('/memberships/plans');
        // Update the pricing cards with API data if needed
        console.log('Membership plans loaded:', plans);
    } catch (error) {
        showToast('Failed to load membership plans', 'error');
    }
}

async function handleMembershipPurchase() {
    if (!state.selectedPlan || !state.currentUser) {
        showToast('Please select a plan and login first', 'error');
        return;
    }

    const paymentMethod = document.getElementById('payment-method').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;
    const termsAgreement = document.getElementById('terms-agreement').checked;

    if (!paymentMethod || !cardNumber || !expiryDate || !cvv || !termsAgreement) {
        showToast('Please fill in all payment details', 'error');
        return;
    }

    try {
        const result = await apiCall('/memberships/purchase', 'POST', {
            planName: state.selectedPlan.name,
            price: state.selectedPlan.price,
            paymentMethod
        }, true);

        state.currentUser.membership = result.membership;
        localStorage.setItem('elitefit_current_user', JSON.stringify(state.currentUser));

        hideModal('membership-modal');
        showSuccessModal(`Welcome to ${state.selectedPlan.name} plan! Your membership is now active.`);
        
        state.selectedPlan = null;
        selectedPlanDisplay.innerHTML = '<span>No plan selected</span>';
        payNowBtn.disabled = true;
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Enhanced Virtual Card Functions
async function showVirtualCard() {
    if (!state.currentUser || !state.currentUser.membership) {
        showToast('You need an active membership to view your virtual card', 'error');
        return;
    }

    try {
        const card = await apiCall('/memberships/card', 'GET', null, true);
        showModal('virtual-card-modal');
        renderVirtualCard(card);
    } catch (error) {
        showToast(error.message, 'error');
    }
}

async function refreshQRCode() {
    try {
        const result = await apiCall('/memberships/card/refresh', 'POST', {}, true);
        renderVirtualCard(result.card);
        showToast('QR code refreshed', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Enhanced Check-in System
async function checkInGym() {
    if (!state.currentUser || !state.currentUser.membership) {
        showToast('Please login and ensure you have an active membership', 'error');
        return;
    }

    try {
        const result = await apiCall('/checkin', 'POST', {
            location: 'Main Entrance'
        }, true);

        showToast(result.message, 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Schedule Management
async function loadSchedule() {
    try {
        const scheduleData = await apiCall('/schedule');
        state.schedule = scheduleData;
        renderSchedule();
    } catch (error) {
        showToast('Failed to load schedule', 'error');
    }
}

async function bookClass(classId) {
    if (!state.currentUser) {
        showModal('login-modal');
        return;
    }

    try {
        const result = await apiCall('/schedule/book', 'POST', { classId }, true);
        showToast(result.message, 'success');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Enhanced Schedule Filter
function renderSchedule(day = 'all') {
    scheduleGrid.innerHTML = '';
    
    const filteredSchedule = day === 'all' 
        ? state.schedule 
        : state.schedule.filter(item => item.day === day);

    filteredSchedule.forEach(item => {
        const scheduleCard = document.createElement('div');
        scheduleCard.className = 'schedule-item';
        scheduleCard.innerHTML = `
            <span class="time">${item.time}</span>
            <h4>${item.name}</h4>
            <p class="trainer">with ${item.trainer}</p>
            <div class="spots">
                <span class="spots-left">${item.spots} spots available</span>
                <button class="book-btn" onclick="bookClass(${item.id})">Book Now</button>
            </div>
        `;
        scheduleGrid.appendChild(scheduleCard);
    });
}

// Enhanced Schedule Filter Buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const day = e.target.dataset.day;
        try {
            const scheduleData = await apiCall(`/schedule?day=${day}`);
            state.schedule = scheduleData;
            renderSchedule(day);
        } catch (error) {
            showToast('Failed to load schedule', 'error');
        }
    });
});

// Navigation Functions
function initNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Form Initialization
function initForms() {
    // Login Form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });

    // Signup Form
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSignup();
    });

    // Membership Form
    membershipForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleMembershipPurchase();
    });

    // Form validation
    setupFormValidation();
}

// Membership Management
function selectPlan(planName, price) {
    state.selectedPlan = { name: planName, price: price };
    selectedPlanDisplay.innerHTML = `
        <span>Selected Plan: <strong>${planName}</strong> - $${price}/month</span>
    `;
    payNowBtn.disabled = false;
    showModal('membership-modal');
}

// Modal Functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function switchModal(fromModal, toModal) {
    hideModal(fromModal);
    setTimeout(() => showModal(toModal), 300);
}

function showSuccessModal(message) {
    document.getElementById('success-message').textContent = message;
    showModal('success-modal');
    
    // Auto-show virtual card after membership purchase
    setTimeout(() => {
        hideModal('success-modal');
        // Show virtual card immediately after payment with safety check
        if (state.currentUser && state.currentUser.membership) {
            showVirtualCard();
        } else {
            // If no membership found, show a message and redirect to membership selection
            showToast('Membership activated! Please select a plan to view your virtual card.', 'info');
        }
    }, 2000);
}

// Virtual Card Management
function renderVirtualCard(card) {
    const cardContainer = document.getElementById('virtual-card-container');
    cardContainer.innerHTML = `
        <div class="virtual-card">
            <div class="card-header">
                <div class="card-logo">
                    <i class="fas fa-dumbbell"></i>
                    <span>EliteFit</span>
                </div>
                <div class="card-type">${card.plan}</div>
            </div>
            <div class="card-body">
                <div class="card-photo">
                    <div class="avatar">${card.name.charAt(0)}</div>
                </div>
                <div class="card-info">
                    <h3>${card.name}</h3>
                    <p class="card-id">Card ID: ${card.cardNumber}</p>
                    <div class="card-details">
                        <div class="detail-item">
                            <span class="label">Status:</span>
                            <span class="value active">Active</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Expires:</span>
                            <span class="value">${formatDate(card.expiryDate)}</span>
                        </div>
                        <div class="detail-item">
                            <span class="label">Member Since:</span>
                            <span class="value">${formatDate(card.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="qr-section">
                    <h4>Scan to Enter</h4>
                    <div class="qr-code" id="qr-code-display">
                        ${generateQRCodeSVG(card.qrCode)}
                    </div>
                    <p class="qr-instruction">Show this QR code at gym entrance</p>
                </div>
                <div class="card-actions">
                    <button class="btn-secondary" onclick="downloadCard()">Download Card</button>
                    <button class="btn-primary" onclick="refreshQRCode()">Refresh QR</button>
                </div>
            </div>
        </div>
    `;
}

function generateQRCodeSVG(data) {
    // Simple QR code representation (in a real app, you'd use a QR library)
    const size = 120;
    const modules = 21; // Standard QR code size
    const moduleSize = size / modules;
    
    let svg = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="100%" height="100%" fill="white"/>`;
    
    // Generate pseudo-random pattern based on data
    const seed = hashCode(data);
    for (let y = 0; y < modules; y++) {
        for (let x = 0; x < modules; x++) {
            // Skip finder patterns area
            if ((x < 7 && y < 7) || (x > modules - 8 && y < 7) || (x < 7 && y > modules - 8)) {
                continue;
            }
            
            if (Math.random() * 1000 < seed % 500) {
                svg += `<rect x="${x * moduleSize}" y="${y * moduleSize}" width="${moduleSize}" height="${moduleSize}" fill="#2563eb"/>`;
            }
        }
    }
    
    svg += `</svg>`;
    return svg;
}

function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function downloadCard() {
    const cardContainer = document.getElementById('virtual-card-container');
    const card = cardContainer.querySelector('.virtual-card');
    
    // Create a simple download of card info
    const cardData = {
        name: card.querySelector('h3').textContent,
        cardNumber: card.querySelector('.card-id').textContent,
        plan: card.querySelector('.card-type').textContent,
        expiry: card.querySelector('.value:nth-child(4)').textContent
    };
    
    const blob = new Blob([JSON.stringify(cardData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `elitefit-card-${cardData.cardNumber}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('Card downloaded successfully', 'success');
}

// Utility Functions
function setupFormValidation() {
    // Card number formatting
    const cardNumberInput = document.getElementById('card-number');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 4) {
                value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
            }
            e.target.value = value;
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('expiry-date');
    if (expiryInput) {
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    // CVV validation
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
        });
    }
}

function setupEventListeners() {
    // Terms agreement toggle
    const termsCheckbox = document.getElementById('terms-agreement');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            payNowBtn.disabled = !termsCheckbox.checked;
        });
    }
}

// Toast Notifications
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation links
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Update Auth UI Function
function updateAuthUI() {
    const authButtons = document.querySelectorAll('.auth-btn');
    if (state.currentUser) {
        authButtons.forEach(btn => btn.style.display = 'none');
        // Add logout button or user menu
        const navbar = document.querySelector('.nav-menu');
        let logoutBtn = document.getElementById('logout-btn');
        
        if (!logoutBtn) {
            logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = 'auth-btn login-btn';
            logoutBtn.textContent = 'Logout';
            logoutBtn.onclick = handleLogout;
            navbar.appendChild(logoutBtn);
        }
    } else {
        authButtons.forEach(btn => btn.style.display = 'inline-block');
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) logoutBtn.remove();
    }
}

// Export functions for global access (for onclick handlers)
window.showModal = showModal;
window.hideModal = hideModal;
window.switchModal = switchModal;
window.selectPlan = selectPlan;
window.bookClass = bookClass;
window.updateAuthUI = updateAuthUI;
