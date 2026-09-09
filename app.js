// Catalog of 30+ items
const products = [
    { name: "Fresh Bananas", price: 1.20, icon: "🍌" },
    { name: "Whole Wheat Bread", price: 3.50, icon: "🍞" },
    { name: "Red Apples", price: 2.50, icon: "🍎" },
    { name: "Milk (1 Gallon)", price: 4.00, icon: "🥛" },
    { name: "Eggs (Dozen)", price: 3.00, icon: "🥚" },
    { name: "Carrots", price: 1.50, icon: "🥕" },
    { name: "Potatoes", price: 4.50, icon: "🥔" },
    { name: "Tomatoes", price: 2.00, icon: "🍅" },
    { name: "Onions", price: 1.80, icon: "🧅" },
    { name: "Broccoli", price: 2.20, icon: "🥦" },
    { name: "Cheese Slices", price: 3.50, icon: "🧀" },
    { name: "Butter", price: 4.20, icon: "🧈" },
    { name: "Yogurt", price: 1.00, icon: "🥣" },
    { name: "Oranges", price: 3.00, icon: "🍊" },
    { name: "Grapes", price: 4.00, icon: "🍇" },
    { name: "Strawberries", price: 3.80, icon: "🍓" },
    { name: "Watermelon", price: 5.00, icon: "🍉" },
    { name: "Chicken Breast", price: 8.00, icon: "🍗" },
    { name: "Rice (1 lb)", price: 2.00, icon: "🍚" },
    { name: "Pasta", price: 1.50, icon: "🍝" },
    { name: "Cereal", price: 4.00, icon: "🥣" },
    { name: "Oatmeal", price: 3.50, icon: "🥣" },
    { name: "Coffee", price: 7.00, icon: "☕" },
    { name: "Tea Bags", price: 4.00, icon: "🍵" },
    { name: "Sugar", price: 2.50, icon: "🧂" },
    { name: "Salt", price: 1.00, icon: "🧂" },
    { name: "Pain Reliever (Tylenol)", price: 6.00, icon: "💊" },
    { name: "Band-Aids", price: 3.50, icon: "🩹" },
    { name: "Cough Syrup", price: 7.50, icon: "🥄" },
    { name: "Hand Sanitizer", price: 3.00, icon: "🧴" },
    { name: "Toilet Paper", price: 8.00, icon: "🧻" },
    { name: "Paper Towels", price: 6.00, icon: "🧻" }
];

let cartCount = 0;
let cartTotal = 0.00;

// Render products to the screen
function renderProducts(items) {
    const list = document.getElementById("product-list");
    list.innerHTML = ""; // Clear current list

    items.forEach(item => {
        list.innerHTML += `
            <div class="bg-white p-4 rounded-xl shadow-md flex items-center justify-between border-2 border-gray-200">
                <div class="flex items-center gap-4">
                    <div class="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">${item.icon}</div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900">${item.name}</h3>
                        <p class="text-xl text-green-700 font-bold mt-1">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button onclick="addToCart(${item.price})" class="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-3 px-6 rounded-lg shadow-md transition">
                    + Add
                </button>
            </div>
        `;
    });
}

// Initial render
renderProducts(products);

// Search functionality
function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = products.filter(item => item.name.toLowerCase().includes(query));
    
    const noResultsDiv = document.getElementById("no-results");
    
    if (filtered.length === 0) {
        document.getElementById("product-list").innerHTML = "";
        noResultsDiv.classList.remove("hidden");
    } else {
        noResultsDiv.classList.add("hidden");
        renderProducts(filtered);
    }
}

// Cart logic
function addToCart(price) {
    cartCount++;
    cartTotal += price;
    document.getElementById("item-count").innerText = `${cartCount} items`;
    document.getElementById("cart-total").innerText = `$${cartTotal.toFixed(2)}`;
    
    // Provide a gentle alert for older users so they know it worked
    alert("Item added to cart!");
}

// Checkout Modal Logic
function openCheckout() {
    if (cartCount === 0) {
        alert("Your cart is empty. Please add items first.");
        return;
    }
    document.getElementById("checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
    document.getElementById("checkoutModal").classList.add("hidden");
}

// Get Live Location
function getLocation() {
    const addressInput = document.getElementById("addressInput");
    addressInput.value = "Finding location...";
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // In a real app, you'd use a Geocoding API to convert coordinates to an address
                addressInput.value = `Location found! (Lat: ${position.coords.latitude.toFixed(2)}, Lng: ${position.coords.longitude.toFixed(2)})`;
            },
            () => {
                addressInput.value = "";
                alert("Could not find your location. Please type your address.");
            }
        );
    } else {
        alert("Location services are not supported by this browser.");
    }
}

// Submit Order Logic
function submitOrder() {
    const address = document.getElementById("addressInput").value;
    if (address.trim() === "") {
        alert("Please enter your address so we know where to deliver.");
        return;
    }
    
    closeCheckout();
    
    // Reset Cart
    cartCount = 0;
    cartTotal = 0;
    document.getElementById("item-count").innerText = `0 items`;
    document.getElementById("cart-total").innerText = `$0.00`;
    document.getElementById("addressInput").value = "";
    
    // Show Success Modal
    document.getElementById("successModal").classList.remove("hidden");
}

function closeSuccess() {
    document.getElementById("successModal").classList.add("hidden");
}

// AI Assistant Logic
function toggleAssistant() {
    const modal = document.getElementById("aiModal");
    if (modal.classList.contains("hidden")) {
        modal.classList.remove("hidden");
    } else {
        modal.classList.add("hidden");
    }
}
