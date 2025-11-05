// Products data
const products = [
    {
        id: 1,
        name: "Qalamlar to'plami",
        description: "12 dona rangli qalamlar, yuqori sifatli",
        price: 15000,
        category: "stationery",
        image: "fas fa-pen",
        imageUrl: "img/qalamlar-toplami.jpg",
        rating: 4.5,
        reviews: 23,
        discount: 10,
        popularity: 95
    },
    {
        id: 2,
        name: "Matematika daftari",
        description: "48 varaq, kvadratli, A4 format",
        price: 5000,
        category: "notebooks",
        image: "fas fa-book",
        imageUrl: "img/daftar-matematika-a4.jpg",
        rating: 4.8,
        reviews: 45,
        discount: 0,
        popularity: 88
    },
    {
        id: 3,
        name: "Qalam",
        description: "Qora qalam, 0.7mm, 12 dona",
        price: 8000,
        category: "stationery",
        image: "fas fa-pen-fancy",
        imageUrl: "img/qalam-qora-0_7mm.jpg",
        rating: 4.2,
        reviews: 18,
        discount: 5,
        popularity: 72
    },
    {
        id: 4,
        name: "Rangli qog'oz",
        description: "A4 format, 20 rang, 200 varaq",
        price: 12000,
        category: "art",
        image: "fas fa-palette",
        imageUrl: "img/rangli-qogoz-a4.jpg",
        rating: 4.6,
        reviews: 31,
        discount: 15,
        popularity: 91
    },
    {
        id: 5,
        name: "Ingliz tili daftari",
        description: "48 varaq, chiziqli, A4 format",
        price: 5000,
        category: "notebooks",
        image: "fas fa-book",
        imageUrl: "img/daftar-ingliz-tili-a4.jpg",
        rating: 4.7,
        reviews: 38,
        discount: 0,
        popularity: 85
    },
    {
        id: 6,
        name: "Kalkulyator",
        description: "Ilmiy kalkulyator, 12 raqamli ekran",
        price: 25000,
        category: "office",
        image: "fas fa-calculator",
        imageUrl: "img/kalkulyator.jpg",
        rating: 4.4,
        reviews: 27,
        discount: 20,
        popularity: 78
    },
    {
        id: 7,
        name: "Rangli qalamlar",
        description: "24 dona rangli qalamlar, qutida",
        price: 18000,
        category: "art",
        image: "fas fa-paint-brush",
        imageUrl: "img/rangli-qalamlar-24.jpg",
        rating: 4.9,
        reviews: 52,
        discount: 12,
        popularity: 96
    },
    {
        id: 8,
        name: "Stapler",
        description: "Ofis stapler, 20 qog'oz uchun",
        price: 15000,
        category: "office",
        image: "fas fa-paperclip",
        imageUrl: "img/stapler.jpg",
        rating: 4.1,
        reviews: 15,
        discount: 8,
        popularity: 65
    },
    {
        id: 9,
        name: "Qizil qalam",
        description: "Qizil qalam, 0.5mm, 10 dona",
        price: 6000,
        category: "stationery",
        image: "fas fa-pen",
        imageUrl: "img/qizil-qalam-0_5mm.jpg",
        rating: 4.3,
        reviews: 22,
        discount: 0,
        popularity: 68
    },
    {
        id: 10,
        name: "Fizika daftari",
        description: "48 varaq, kvadratli, A4 format",
        price: 5000,
        category: "notebooks",
        image: "fas fa-book",
        imageUrl: "img/daftar-fizika-a4.jpg",
        rating: 4.5,
        reviews: 29,
        discount: 0,
        popularity: 82
    },
    {
        id: 11,
        name: "Qaychi",
        description: "Ofis qaychisi, qo'lda ishlatish uchun",
        price: 8000,
        category: "office",
        image: "fas fa-cut",
        imageUrl: "img/qaychi.jpg",
        rating: 4.0,
        reviews: 12,
        discount: 0,
        popularity: 58
    },
    {
        id: 12,
        name: "Rangli qalamlar",
        description: "36 dona rangli qalamlar, professional",
        price: 22000,
        category: "art",
        image: "fas fa-paint-brush",
        imageUrl: "img/rangli-qalamlar-36.jpg",
        rating: 4.8,
        reviews: 41,
        discount: 18,
        popularity: 94
    },
    {
        id: 13,
        name: "Yelim",
        description: "Ofis yelimi, 50ml, 5 dona",
        price: 10000,
        category: "office",
        image: "fas fa-tint",
        imageUrl: "img/yelim-50ml.jpg",
        rating: 3.9,
        reviews: 8,
        discount: 0,
        popularity: 45
    },
    {
        id: 14,
        name: "Geografiya daftari",
        description: "48 varaq, chiziqli, A4 format",
        price: 5000,
        category: "notebooks",
        image: "fas fa-book",
        imageUrl: "img/daftar-geografiya-a4.jpg",
        rating: 4.6,
        reviews: 33,
        discount: 0,
        popularity: 79
    },
    {
        id: 15,
        name: "Markerlar",
        description: "Rangli markerlar, 12 dona",
        price: 14000,
        category: "stationery",
        image: "fas fa-highlighter",
        imageUrl: "img/markerlar-12.jpg",
        rating: 4.4,
        reviews: 26,
        discount: 7,
        popularity: 73
    }
];

// Shopping cart
let cart = [];

// Wishlist
let wishlist = [];

// Compare list
let compareList = [];

// Current filter and search
let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'default';
let priceMin = null;
let priceMax = null;

// User authentication
let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];

// Ratings storage (for user-submitted ratings)
let ratingsData = JSON.parse(localStorage.getItem('ratingsData')) || {};

// Chat responses
const chatResponses = [
    "Qanday yordam kerak?",
    "Mahsulotlar haqida savol bormi?",
    "Buyurtma berishda yordam kerakmi?",
    "Boshqa savollar bormi?",
    "Rahmat, sizga yordam bera olishimdan xursandman!"
];

// DOM elements
const productsGrid = document.getElementById('products-grid');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    setupEventListeners();
    updateCartUI();
    injectJsonLd(products);
});

// Fallback: if image fails, replace with icon
function handleImgError(imgEl, iconClass) {
    if (!imgEl || !imgEl.parentElement) return;
    const container = imgEl.parentElement;
    try { imgEl.remove(); } catch (_) {}
    const i = document.createElement('i');
    i.className = iconClass || 'fas fa-image';
    container.appendChild(i);
}

// Generate stars for rating
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return `<div class="stars">${stars}</div>`;
}

// Display products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem; grid-column: 1/-1;">Hech qanday mahsulot topilmadi</p>';
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" loading="lazy" decoding="async" onerror="handleImgError(this, '${product.image}')">` : `<i class="${product.image}"></i>`}
            </div>
            <div class="product-info">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <button class="wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}" 
                            onclick="toggleWishlist(${product.id})" title="Sevimlilar">
                        <i class="${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <div class="product-rating">
                    ${generateStars(product.rating || 0)}
                    <span class="rating-count">(${product.reviews || 0})</span>
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    ${product.discount ? 
                        `<span class="old-price">${product.price.toLocaleString()} so'm</span>
                         <span class="new-price">${(product.price * (1 - product.discount/100)).toLocaleString()} so'm</span>
                         <span class="discount-badge">-${product.discount}%</span>` :
                        `${product.price.toLocaleString()} so'm`
                    }
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart"></i> Savatga qo'shish
                    </button>
                    <button class="compare-btn ${compareList.includes(product.id) ? 'active' : ''}" 
                            onclick="toggleCompare(${product.id})" title="Taqqoslash">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                    <button class="detail-btn" onclick="showProductDetail(${product.id})" title="Batafsil">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification('Mahsulot savatga qo\'shildi!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Savat bo\'sh</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} so'm</p>
                </div>
                <div class="cart-item-controls">
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="updateCartQuantity(${item.id}, this.value)" 
                           style="width: 60px; padding: 5px; margin-right: 10px;">
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

// Toggle wishlist
function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showNotification('Mahsulot sevimlilardan olib tashlandi');
    } else {
        wishlist.push(productId);
        showNotification('Mahsulot sevimlilarga qo\'shildi');
    }
    displayProducts(getFilteredProducts());
}

// Toggle compare
function toggleCompare(productId) {
    if (compareList.includes(productId)) {
        compareList = compareList.filter(id => id !== productId);
        showNotification('Mahsulot taqqoslashdan olib tashlandi');
    } else {
        if (compareList.length >= 3) {
            showNotification('Maksimal 3 ta mahsulotni taqqoslashingiz mumkin', 'error');
            return;
        }
        compareList.push(productId);
        showNotification('Mahsulot taqqoslashga qo\'shildi');
    }
    displayProducts(getFilteredProducts());
}

// Search products
function searchProducts(query) {
    currentSearch = query.toLowerCase();
    displayProducts(getFilteredProducts());
}

// Sort products
function sortProducts(sortType) {
    currentSort = sortType;
    displayProducts(getFilteredProducts());
}

// Get filtered and sorted products
function getFilteredProducts() {
    let filtered = products;
    
    // Filter by category
    if (currentFilter !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilter);
    }
    
    // Filter by search
    if (currentSearch) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(currentSearch) ||
            product.description.toLowerCase().includes(currentSearch)
        );
    }
    
    // Filter by price
    if (priceMin !== null) {
        filtered = filtered.filter(product => product.price >= priceMin);
    }
    if (priceMax !== null) {
        filtered = filtered.filter(product => product.price <= priceMax);
    }
    
    // Sort products
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'popularity':
            filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
            break;
        default:
            // Keep original order
            break;
    }
    
    return filtered;
}

// Filter products
function filterProducts(category) {
    currentFilter = category;
    displayProducts(getFilteredProducts());
}

// User Authentication Functions
function showLoginModal() {
    document.getElementById('login-modal').classList.add('active');
}

function showRegisterModal() {
    document.getElementById('register-modal').classList.add('active');
}

function hideModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
}

function login(phone) {
    const user = users.find(u => u.phone === phone);
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthUI();
        hideModals();
        showNotification('Muvaffaqiyatli kirdingiz!', 'success');
        return true;
    }
    return false;
}

function register(userData) {
    if (users.find(u => u.phone === userData.phone)) {
        showNotification('Bu telefon raqam allaqachon ro\'yxatdan o\'tgan', 'error');
        return false;
    }
    
    const newUser = {
        id: Date.now(),
        name: `${userData.firstName} ${userData.lastName}`.trim(),
        phone: userData.phone,
        first_name: userData.firstName,
        last_name: userData.lastName
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    // Backend'ga foydalanuvchi yuborish
    fetch('usres.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone: userData.phone
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Foydalanuvchi backend\'ga yuborildi');
        }
    })
    .catch(err => {
        console.error('Backend\'ga yuborishda xato:', err);
    });
    
    updateAuthUI();
    hideModals();
    showNotification('Muvaffaqiyatli ro\'yxatdan o\'tdingiz!', 'success');
    return true;
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Tizimdan chiqdingiz', 'success');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    
    if (currentUser) {
        loginBtn.textContent = currentUser.name;
        loginBtn.onclick = logout;
        registerBtn.style.display = 'none';
    } else {
        loginBtn.textContent = 'Kirish';
        loginBtn.onclick = showLoginModal;
        registerBtn.style.display = 'block';
    }
}

// Product Detail Functions
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('product-modal');
    const nameEl = document.getElementById('modal-product-name');
    const contentEl = document.getElementById('product-detail-content');
    
    nameEl.textContent = product.name;
    contentEl.innerHTML = `
        <div class="product-detail-image">
            ${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" decoding="async" onerror="handleImgError(this, '${product.image}')">` : `<i class="${product.image}"></i>`}
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <div class="product-detail-rating">
                ${generateStars(product.rating || 0)}
                <span>(${product.reviews || 0} baho)</span>
            </div>
            <div class="product-detail-price">
                ${product.discount ? 
                    `<span class="old-price">${product.price.toLocaleString()} so'm</span>
                     <span class="new-price">${(product.price * (1 - product.discount/100)).toLocaleString()} so'm</span>
                     <span class="discount-badge">-${product.discount}%</span>` :
                    `${product.price.toLocaleString()} so'm`
                }
            </div>
            <p class="product-detail-description">${product.description}</p>
            <div class="product-detail-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id}); hideModals();">
                    <i class="fas fa-shopping-cart"></i> Savatga qo'shish
                </button>
                <button class="btn btn-secondary" onclick="toggleWishlist(${product.id})">
                    <i class="${wishlist.includes(product.id) ? 'fas' : 'far'} fa-heart"></i> 
                    ${wishlist.includes(product.id) ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
                </button>
            </div>
            <div style="margin-top:1rem;display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;">
                <span style="color:#2c3e50;font-weight:600;">Baholash:</span>
                <button class="btn" style="padding:6px 10px;" onclick="submitRating(${product.id},1)">1 ⭐</button>
                <button class="btn" style="padding:6px 10px;" onclick="submitRating(${product.id},2)">2 ⭐⭐</button>
                <button class="btn" style="padding:6px 10px;" onclick="submitRating(${product.id},3)">3 ⭐⭐⭐</button>
                <button class="btn" style="padding:6px 10px;" onclick="submitRating(${product.id},4)">4 ⭐⭐⭐⭐</button>
                <button class="btn" style="padding:6px 10px;" onclick="submitRating(${product.id},5)">5 ⭐⭐⭐⭐⭐</button>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// Submit rating and update product averages
function submitRating(productId, rating) {
    const r = Math.max(1, Math.min(5, Number(rating) || 0));
    if (!ratingsData[productId]) {
        ratingsData[productId] = { sum: 0, total: 0 };
    }
    ratingsData[productId].sum += r;
    ratingsData[productId].total += 1;
    localStorage.setItem('ratingsData', JSON.stringify(ratingsData));
    const product = products.find(p => p.id === productId);
    if (product) {
        const data = ratingsData[productId];
        const avg = data.sum / data.total;
        product.rating = Math.round(avg * 10) / 10;
        product.reviews = data.total;
        displayProducts(getFilteredProducts());
        showProductDetail(productId);
        showNotification('Rahmat! Bahoyingiz qabul qilindi.', 'success');
    }
}

// Inject JSON-LD Product schema for SEO
function injectJsonLd(productsList) {
    try {
        const items = productsList.map(p => {
            const priceValue = p.discount ? Math.round(p.price * (1 - p.discount/100)) : p.price;
            const schema = {
                '@context': 'https://schema.org',
                '@type': 'Product',
                name: p.name,
                description: p.description,
                image: p.imageUrl || undefined,
                category: p.category,
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'UZS',
                    price: String(priceValue),
                    availability: 'https://schema.org/InStock'
                }
            };
            if (p.reviews && p.rating) {
                schema.aggregateRating = {
                    '@type': 'AggregateRating',
                    ratingValue: String(p.rating),
                    reviewCount: String(p.reviews)
                };
            }
            return schema;
        });
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(items);
        document.head.appendChild(script);
    } catch (_) {
        // no-op
    }
}

// Chat Functions
function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    chatWidget.classList.toggle('active');
}

function sendChatMessage() {
    const input = document.getElementById('chat-input-field');
    const message = input.value.trim();
    if (!message) return;
    
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const randomResponse = chatResponses[Math.floor(Math.random() * chatResponses.length)];
        addChatMessage(randomResponse, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `chat-message ${sender}-message`;
    messageEl.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Cart toggle
    cartBtn.addEventListener('click', () => {
        cartOverlay.classList.add('active');
    });
    
    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });
    
    // Close cart when clicking overlay
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
        }
    });
    
    // Search input
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });
    
    // Price filter
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceApplyBtn = document.getElementById('price-apply');
    if (priceApplyBtn) {
        priceApplyBtn.addEventListener('click', () => {
            const minVal = priceMinInput.value ? parseInt(priceMinInput.value, 10) : null;
            const maxVal = priceMaxInput.value ? parseInt(priceMaxInput.value, 10) : null;
            priceMin = isNaN(minVal) ? null : minVal;
            priceMax = isNaN(maxVal) ? null : maxVal;
            displayProducts(getFilteredProducts());
        });
    }
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Filter products
            const category = btn.getAttribute('data-filter');
            filterProducts(category);
        });
    });
    
    // Checkout
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            showNotification('Savat bo\'sh!', 'error');
            return;
        }
        
        // Check if user is logged in
        if (!currentUser) {
            showNotification('Buyurtma berish uchun ro\'yxatdan o\'ting!', 'error');
            cartOverlay.classList.remove('active');
            showRegisterModal();
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Create order
        const order = {
            id: Date.now(),
            userName: currentUser ? currentUser.name : 'Noma\'lum',
            userEmail: currentUser ? currentUser.email : '',
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            total: total,
            status: 'pending',
            date: new Date().toISOString()
        };
        
        // Save order to localStorage (backup)
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Backend'ga buyurtma yuborish
        fetch('orders.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                userName: order.userName,
                items: JSON.stringify(order.items),
                total: order.total,
                status: order.status
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Buyurtma backend\'ga yuborildi');
            }
        })
        .catch(err => {
            console.error('Backend\'ga yuborishda xato:', err);
        });
        
        const message = `Buyurtma muvaffaqiyatli yuborildi!\nBuyurtma raqami: #${order.id}\nJami: ${total.toLocaleString()} so'm\n\nBiz siz bilan tez orada bog'lanamiz.`;
        
        alert(message);
        
        // Clear cart
        cart = [];
        updateCartUI();
        cartOverlay.classList.remove('active');
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Xabaringiz yuborildi! Tez orada siz bilan bog\'lanamiz.', 'success');
        contactForm.reset();
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Muvaffaqiyatli obuna bo\'ldingiz! Yangiliklar haqida xabar olasiz.', 'success');
        newsletterForm.reset();
    });
    
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
    
    // Auth buttons
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
    document.getElementById('register-btn').addEventListener('click', showRegisterModal);
    
    // Modal close buttons
    document.getElementById('close-login').addEventListener('click', hideModals);
    document.getElementById('close-register').addEventListener('click', hideModals);
    document.getElementById('close-product').addEventListener('click', hideModals);
    
    // Modal switch links
    document.getElementById('switch-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        hideModals();
        showRegisterModal();
    });
    
    document.getElementById('switch-to-login').addEventListener('click', (e) => {
        e.preventDefault();
        hideModals();
        showLoginModal();
    });
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const phone = e.target.querySelector('input[type="tel"]').value;
        
        if (!login(phone)) {
            showNotification('Telefon raqam topilmadi', 'error');
        }
    });
    
    // Register form
    document.getElementById('register-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('input');
        const userData = {
            firstName: inputs[0].value,
            lastName: inputs[1].value,
            phone: inputs[2].value
        };
        
        register(userData);
    });
    
    // Chat functionality
    document.getElementById('chat-btn').addEventListener('click', toggleChat);
    document.getElementById('close-chat').addEventListener('click', toggleChat);
    document.getElementById('send-message').addEventListener('click', sendChatMessage);
    document.getElementById('chat-input-field').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Close modals when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                hideModals();
            }
        });
    });
    
    // Initialize user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        font-weight: 500;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
