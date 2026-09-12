// --- Navigation Logic ---
function showScreen(screenId) {
    ['loginScreen', 'otpScreen', 'profileScreen', 'mainScreen'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

// --- Login & OTP Logic ---
const mobileInput = document.getElementById('mobileInput');
const loginBtn = document.getElementById('loginBtn');

mobileInput.addEventListener('input', (e) => {
    if (e.target.value.length === 10) {
        loginBtn.disabled = false;
        loginBtn.classList.replace('bg-gray-300', 'bg-black');
        loginBtn.classList.replace('text-gray-500', 'text-white');
    } else {
        loginBtn.disabled = true;
        loginBtn.classList.replace('bg-black', 'bg-gray-300');
        loginBtn.classList.replace('text-white', 'text-gray-500');
    }
});

function sendOTP() {
    document.getElementById('displayMobile').innerText = "+91 " + mobileInput.value;
    showScreen('otpScreen');
}

function verifyOTP() {
    const otp = document.getElementById('otpInput').value;
    if (otp === '1234') { // Mock verification
        showScreen('profileScreen');
    } else {
        alert("Invalid OTP. Try 1234.");
    }
}

function completeProfile() {
    const name = document.getElementById('nameInput').value;
    if (name.trim() === "") return alert("Please enter your name");
    
    document.getElementById('greetName').innerText = name.split(' ')[0];
    showScreen('mainScreen');
    
    // Fetch mock location
    setTimeout(() => {
        document.getElementById('userLocation').innerText = "Koramangala, Bengaluru";
    }, 1500);
}

// --- E-Commerce Logic ---
const products = [
    { id: 1, name: "Amul Taaza Milk", qty: "500 ml", price: 27, image: "🥛" },
    { id: 2, name: "Harvest Gold Bread", qty: "400 g", price: 40, image: "🍞" },
    { id: 3, name: "Farm Fresh Eggs", qty: "6 pieces", price: 50, image: "🥚" },
    { id: 4, name: "Onion (Pyaz)", qty: "1 kg", price: 35, image: "🧅" }
];

let cart = {};

function renderProducts() {
    const list = document.getElementById('productList');
    list.innerHTML = products.map(p => `
        <div class="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div class="text-6xl text-center mb-2 bg-gray-50 rounded-lg py-4">${p.image}</div>
            <h4 class="font-bold text-sm text-gray-800 line-clamp-2">${p.name}</h4>
            <p class="text-xs text-gray-500 mb-2">${p.qty}</p>
            <div class="flex justify-between items-center mt-auto">
                <p class="font-extrabold text-sm">₹${p.price}</p>
                <div id="btn-container-${p.id}">
                    <button onclick="updateCart(${p.id}, 1)" class="text-green-600 font-bold border border-green-600 rounded-lg px-4 py-1 text-sm bg-green-50 shadow-sm">ADD</button>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCart(id, change) {
    if (!cart[id]) cart[id] = 0;
    cart[id] += change;
    
    if (cart[id] <= 0) {
        delete cart[id];
        renderAddButton(id);
    } else {
        renderCounterButton(id);
    }
    updateCartUI();
}

function renderAddButton(id) {
    document.getElementById(`btn-container-${id}`).innerHTML = `
        <button onclick="updateCart(${id}, 1)" class="text-green-600 font-bold border border-green-600 rounded-lg px-4 py-1 text-sm bg-green-50 shadow-sm">ADD</button>
    `;
}

function renderCounterButton(id) {
    document.getElementById(`btn-container-${id}`).innerHTML = `
        <div class="flex items-center bg-green-600 text-white rounded-lg px-2 py-1 text-sm font-bold shadow-sm">
            <button onclick="updateCart(${id}, -1)" class="px-2">-</button>
            <span class="px-2">${cart[id]}</span>
            <button onclick="updateCart(${id}, 1)" class="px-2">+</button>
        </div>
    `;
}

function updateCartUI() {
    let totalItems = 0;
    let totalPrice = 0;
    
    for (let id in cart) {
        let product = products.find(p => p.id == id);
        totalItems += cart[id];
        totalPrice += cart[id] * product.price;
    }
    
    const cartBar = document.getElementById('cartBar');
    if (totalItems > 0) {
        cartBar.classList.remove('hidden');
        document.getElementById('cartItemsText').innerText = `${totalItems} items`;
        document.getElementById('cartTotalText').innerText = `₹${totalPrice}`;
    } else {
        cartBar.classList.add('hidden');
    }
}

// Initialize App
renderProducts();
