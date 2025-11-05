// Admin Panel JavaScript

// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Global variables
let currentAdmin = null;
let products = JSON.parse(localStorage.getItem('products')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkAdminSession();
});

// Setup event listeners
function setupEventListeners() {
    // Admin login form
    document.getElementById('admin-login-form').addEventListener('submit', handleAdminLogin);
    
    // Sidebar navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            showSection(section);
        });
    });
    
    // Sidebar toggle for mobile
    document.getElementById('sidebar-toggle').addEventListener('click', toggleSidebar);
    
    // Product form
    document.getElementById('product-form').addEventListener('submit', handleProductSubmit);
    
    // Order status filter
    document.getElementById('order-status-filter').addEventListener('change', filterOrders);
    
    // Close modal when clicking overlay
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') {
            hideProductModal();
        }
    });
}

// Check admin session
function checkAdminSession() {
    const savedAdmin = localStorage.getItem('adminSession');
    if (savedAdmin) {
        currentAdmin = JSON.parse(savedAdmin);
        showDashboard();
    } else {
        showLogin();
    }
}

// Handle admin login
function handleAdminLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = e.target.querySelector('input[type="text"]').value;
    const password = e.target.querySelector('input[type="password"]').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        currentAdmin = { username, loginTime: new Date() };
        localStorage.setItem('adminSession', JSON.stringify(currentAdmin));
        showDashboard();
    } else {
        alert('Noto\'g\'ri foydalanuvchi nomi yoki parol!');
    }
}

// Show login screen
function showLogin() {
    document.getElementById('admin-login').style.display = 'flex';
    document.getElementById('admin-dashboard').style.display = 'none';
}

// Show dashboard
function showDashboard() {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-dashboard').style.display = 'flex';
    document.getElementById('admin-name').textContent = currentAdmin.username;
    loadDashboardData();
    // Ensure users data is loaded from server for accurate counts
    fetchUsers();
}

// Logout admin
function logoutAdmin() {
    currentAdmin = null;
    localStorage.removeItem('adminSession');
    showLogin();
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(`${sectionName}-section`).classList.add('active');
    
    // Add active class to nav item
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        products: 'Mahsulotlar',
        orders: 'Buyurtmalar',
        users: 'Foydalanuvchilar',
        analytics: 'Analitika'
    };
    document.getElementById('page-title').textContent = titles[sectionName];
    
    // Load section data
    switch(sectionName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'products':
            loadProductsTable();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'users':
            loadUsersTable();
            break;
        case 'analytics':
            loadAnalytics();
            break;
    }
}

// Toggle sidebar for mobile
function toggleSidebar() {
    document.querySelector('.admin-sidebar').classList.toggle('active');
}

// Load dashboard data
function loadDashboardData() {
    // Backend'dan ma'lumotlarni olish
    Promise.all([
        fetch('products.php').then(r => r.json()),
        fetch('orders.php').then(r => r.json()),
        fetch('usres.php').then(r => r.json())
    ]).then(([productsData, ordersData, usersData]) => {
        products = productsData;
        orders = ordersData;
        users = usersData;
        
        // Animate stats counters
        animateCounter('total-products', products.length);
        animateCounter('total-orders', orders.length);
        animateCounter('total-users', users.length);
        
        // Calculate total revenue
        const totalRevenue = orders.reduce((sum, order) => sum + parseInt(order.total || 0), 0);
        animateCounter('total-revenue', totalRevenue, true);
        
        // Load recent orders
        loadRecentOrders();
    }).catch(err => {
        console.error('Dashboard ma\'lumotlarini yuklashda xato:', err);
    });
}

// Animate counter function
function animateCounter(elementId, targetValue, isCurrency = false) {
    const element = document.getElementById(elementId);
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutCubic);
        
        if (isCurrency) {
            element.textContent = currentValue.toLocaleString() + ' so\'m';
        } else {
            element.textContent = currentValue;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Load recent orders
function loadRecentOrders() {
    const tbody = document.getElementById('recent-orders-table');
    const recentOrders = orders.slice(-5).reverse();
    
    tbody.innerHTML = recentOrders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.userName || 'Noma\'lum'}</td>
            <td>${order.items.length} mahsulot</td>
            <td>${order.total.toLocaleString()} so'm</td>
            <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
        </tr>
    `).join('');
}

// Load products table
function loadProductsTable() {
    const tbody = document.getElementById('products-table');
    fetch('products.php')
        .then(response => response.json())
        .then(products => {
            tbody.innerHTML = products.map(product => `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="width:48px;height:48px;object-fit:contain;border-radius:6px;border:1px solid #eee;">` : `<i class="${product.icon || product.image}" style="font-size: 1.5rem; color: #e74c3c;"></i>`}</td>
                    <td>${product.name}</td>
                    <td>${getCategoryText(product.category)}</td>
                    <td>${parseInt(product.price).toLocaleString()} so'm</td>
                    <td>${product.discount || 0}%</td>
                    <td>${product.rating || 0}/5</td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-warning" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        })
        .catch(() => {
            tbody.innerHTML = '<tr><td colspan="8">Serverdan mahsulotlarni olishda xatolik!</td></tr>';
        });
}

// Load orders table
function loadOrdersTable() {
    const tbody = document.getElementById('orders-table');
    
    // Backend'dan buyurtmalarni olish
    fetch('orders.php')
        .then(response => response.json())
        .then(ordersData => {
            orders = ordersData;
            
            tbody.innerHTML = orders.map(order => {
                // items ni parse qilish (agar string bo'lsa)
                let itemsArray = [];
                try {
                    itemsArray = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
                } catch(e) {
                    itemsArray = [];
                }
                
                // Mahsulotlar ro'yxatini ko'rsatish
                const itemsList = itemsArray.map(item => 
                    `${item.name} (${item.quantity}x)`
                ).join(', ') || 'Ma\'lumot yo\'q';
                
                return `
                    <tr>
                        <td>#${order.id}</td>
                        <td>${order.userName || 'Noma\'lum'}</td>
                        <td title="${itemsList}">${itemsArray.length} mahsulot</td>
                        <td>${parseInt(order.total || 0).toLocaleString()} so'm</td>
                        <td><span class="status-badge status-${order.status}">${getStatusText(order.status)}</span></td>
                        <td>${order.date ? new Date(order.date).toLocaleDateString() : ''}</td>
                        <td>
                            <div class="select-and-delete">
                                <select class="order-status-select" onchange="updateOrderStatus(${order.id}, this.value)">
                                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Kutilmoqda</option>
                                    <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Jarayonda</option>
                                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Yakunlangan</option>
                                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Bekor qilingan</option>
                                </select>
                                <button class="btn btn-sm btn-danger" title="O'chirish" onclick="deleteOrder(${order.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        })
        .catch(err => {
            console.error('Buyurtmalarni yuklashda xato:', err);
            tbody.innerHTML = '<tr><td colspan="7">Buyurtmalarni yuklashda xatolik!</td></tr>';
        });
}

// Load users table
function loadUsersTable() {
    fetchUsers();
}

function renderUsersTable() {
    const tbody = document.getElementById('users-table');
    if (!tbody) return;
    tbody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.first_name || ''}</td>
            <td>${user.last_name || ''}</td>
            <td>${user.phone || ''}</td>
            <td>${user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Load analytics
function loadAnalytics() {
    // Oylik savdo charti joyida qoladi (agar chart.js ishlatilsa)
    // Mashhur mahsulotlarni chiqarish
    fetch('products.php')
        .then(response => response.json())
        .then(products => {
            // Eng mashhur 6 ta mahsulot (baho, sharh, sotuv bo'yicha)
            const popular = products
                .sort((a, b) => (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0))
                .slice(0, 6);
            const container = document.getElementById('popular-products-list');
            if (!container) return;
            container.innerHTML = popular.map(product => `
                <div style="background:#fff;border-radius:12px;box-shadow:0 4px 16px rgba(0,0,0,0.07);padding:1.2rem;text-align:center;">
                    <div style=\"font-size:2.5rem;color:#e74c3c;margin-bottom:0.7rem;\">${product.imageUrl ? `<img src="${product.imageUrl}" alt="${product.name}" style="width:72px;height:72px;object-fit:contain;border-radius:6px;border:1px solid #eee;">` : `<i class=\"${product.icon || product.image}\"></i>`}</div>
                    <div style="font-weight:700;font-size:1.1rem;color:#2c3e50;margin-bottom:0.4rem;">${product.name}</div>
                    <div style="color:#666;font-size:0.95rem;margin-bottom:0.5rem;">${product.category}</div>
                    <div style="color:#f39c12;font-size:1rem;margin-bottom:0.3rem;">⭐ ${product.rating || 0} / 5</div>
                    <div style="color:#27ae60;font-weight:600;">${parseInt(product.price).toLocaleString()} so'm</div>
                </div>
            `).join('');
        });
}

// Product management functions
function showAddProductModal() {
    document.getElementById('modal-title').textContent = 'Yangi mahsulot qo\'shish';
    document.getElementById('product-form').reset();
    document.getElementById('product-modal').classList.add('active');
}

function editProduct(productId) {
    // Fetch product from backend
    fetch('products.php')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            if (!product) return;
            document.getElementById('modal-title').textContent = 'Mahsulotni tahrirlash';
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-category').value = product.category;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-discount').value = product.discount || 0;
            document.getElementById('product-rating').value = product.rating || 0;
            document.getElementById('product-reviews').value = product.reviews || 0;
            document.getElementById('product-icon').value = product.icon || product.image;
            const imageUrlInput = document.getElementById('product-imageUrl');
            if (imageUrlInput) imageUrlInput.value = product.imageUrl || '';
            // Store current product ID for editing
            document.getElementById('product-form').dataset.productId = productId;
            document.getElementById('product-modal').classList.add('active');
        });
}

function deleteProduct(productId) {
    if (confirm('Bu mahsulotni o\'chirishni xohlaysizmi?')) {
        showLoading('Mahsulot o\'chirilmoqda...');
        fetch('products.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${productId}`
        })
        .then(response => response.text())
        .then(result => {
            hideLoading();
            if (result === 'success') {
                showNotification('Mahsulot muvaffaqiyatli o\'chirildi!', 'success');
                loadProductsTable();
            } else {
                showNotification('Mahsulotni o\'chirishda xatolik!', 'error');
            }
        })
        .catch(() => {
            hideLoading();
            showNotification('Serverga ulanishda xatolik!', 'error');
        });
    }
}

function handleProductSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('product-form');
    const formData = new FormData(form);
    const imageUrlInput = document.getElementById('product-imageUrl');
    if (imageUrlInput && imageUrlInput.value) {
        formData.set('imageUrl', imageUrlInput.value);
    }
    showLoading('Mahsulot saqlanmoqda...');
    // If editing, add id to formData
    const productId = form.dataset.productId;
    if (productId) {
        formData.append('id', productId);
    }
    fetch('products.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then (result => {
        hideProductModal();
        hideLoading();
        if (result === 'success') {
            showNotification(productId ? 'Mahsulot muvaffaqiyatli tahrirlandi!' : 'Mahsulot muvaffaqiyatli qo\'shildi!', 'success');
            loadProductsTable();
        } else {
            showNotification('Xatolik yuz berdi!', 'error');
        }
        form.dataset.productId = '';
    })
    .catch(() => {
        hideLoading();
        showNotification('Serverga ulanishda xatolik!', 'error');
    });
}

function hideProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.getElementById('product-form').dataset.productId = '';
}

// Order management functions
function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id == orderId);
    if (order) {
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrdersTable();
        alert('Buyurtma holati yangilandi!');
    }
}

function filterOrders() {
    const status = document.getElementById('order-status-filter').value;
    loadOrdersTable();
}

// User management functions

// Utility functions
function getCategoryText(category) {
    const categories = {
        'stationery': 'Yozuv qurollari',
        'notebooks': 'Daftarlar',
        'art': 'San\'at qurollari',
        'office': 'Ofis qurollari'
    };
    return categories[category] || category;
}

function getStatusText(status) {
    const statuses = {
        'pending': 'Kutilmoqda',
        'processing': 'Jarayonda',
        'completed': 'Yakunlangan',
        'cancelled': 'Bekor qilingan'
    };
    return statuses[status] || status;
}

// Initialize with sample data if needed
function initializeSampleData() {
    if (products.length === 0) {
        // Load products from main script if available
        const mainProducts = JSON.parse(localStorage.getItem('mainProducts')) || [];
        if (mainProducts.length > 0) {
            products = mainProducts;
            localStorage.setItem('products', JSON.stringify(products));
        }
    }
    
    if (orders.length === 0) {
        // Create some sample orders
        orders = [
            {
                id: 1,
                userName: 'Ali Valiyev',
                items: [
                    { id: 1, name: 'Qalamlar to\'plami', price: 15000, quantity: 2 },
                    { id: 2, name: 'Matematika daftari', price: 5000, quantity: 1 }
                ],
                total: 35000,
                status: 'pending',
                date: new Date().toISOString()
            },
            {
                id: 2,
                userName: 'Malika Karimova',
                items: [
                    { id: 3, name: 'Qalam', price: 8000, quantity: 3 }
                ],
                total: 24000,
                status: 'completed',
                date: new Date(Date.now() - 86400000).toISOString()
            }
        ];
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}

// Show notification function
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInRight 0.5s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 500);
        }
    }, 3000);
}

// Show loading overlay
function showLoading(text = 'Yuklanmoqda...') {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div style="text-align: center;">
            <div class="loading-spinner"></div>
            <div class="loading-text">${text}</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
}

// Hide loading overlay
function hideLoading() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Initialize sample data on first load
initializeSampleData();

function logoutAdmin() {
    // Admin sessiyasini tozalash (agar localStorage ishlatilsa)
    localStorage.removeItem('adminSession');
    // Foydalanuvchi paneliga (index.html) yo'naltirish
    window.location.href = 'index.html';
}

// Buyurtmalarni olish
function fetchOrders() {
    fetch('orders.php')
        .then(response => response.json())
        .then(data => {
            orders = data;
            renderOrdersTable();
        });
}

// Buyurtma qo'shish
function addOrder(order) {
    fetch('orders.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(order)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) fetchOrders();
    });
}

// Buyurtmani tahrirlash
function editOrder(id, status) {
    fetch('orders.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({edit: 1, id, status})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) fetchOrders();
    });
}

// Buyurtmani o'chirish
function deleteOrder(id) {
    fetch('orders.php', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({id})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) fetchOrders();
    });
}

// Foydalanuvchilarni olish
function fetchUsers() {
    fetch('usres.php')
        .then(response => response.json())
        .then(data => {
            users = data;
            renderUsersTable();
        });
}

// Foydalanuvchi qo'shish
function addUser(user) {
    fetch('usres.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(user)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) fetchUsers();
    });
}

// Foydalanuvchini tahrirlash
function editUser(id, first_name, last_name, phone) {
    fetch('usres.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({edit: 1, id, first_name, last_name, phone})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) fetchUsers();
    });
}

// Foydalanuvchini o'chirish
function deleteUser(id) {
    fetch('usres.php', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({id})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) fetchUsers();
    });
}

function fetchAnalytics() {
    fetch('analytics.php')
        .then(response => response.json())
        .then(data => {
            // Statistikalarni ekranga chiqarish uchun
            renderAnalytics(data);
        });
}

function renderAnalytics(data) {
    // Statistika qismini chiqarish
    document.getElementById('analytics-summary').innerHTML = `
        <div class="stat-box">Foydalanuvchilar: <b>${data.users}</b></div>
        <div class="stat-box">Buyurtmalar: <b>${data.orders}</b></div>
    `;
    // Mashhur mahsulotlar grid
    document.getElementById('popular-products').innerHTML = data.popular_produchats.map(p =>
        `<div class="product-card">
            <div><b>${p.name}</b></div>
            <div>Sotilgan: ${p.total_sold}</div>
        </div>`
    ).join('');
}

// Sahifa yuklanganda analitikani chaqirish
document.addEventListener('DOMContentLoaded', function() {
    fetchAnalytics();
});

function validateAdminLogin(username, password) {
    if (!username || !password) {
        showNotification('Login va parol to\'ldirilishi shart!', 'error');
        return false;
    }
    if (username.length < 4 || password.length < 6) {
        showNotification('Login yoki parol juda qisqa!', 'error');
        return false;
    }
    return true;
}

function validateProductForm(formData) {
    if (!formData.get('name') || !formData.get('price')) {
        showNotification('Mahsulot nomi va narxi to\'ldirilishi shart!', 'error');
        return false;
    }
    if (isNaN(formData.get('price')) || formData.get('price') <= 0) {
        showNotification('Narx noto\'g\'ri!', 'error');
        return false;
    }
    return true;
}