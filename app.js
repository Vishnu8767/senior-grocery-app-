let cartCount = 0;
let cartTotal = 0.00;

function addToCart() {
    // Increment items
    cartCount += 1;
    
    // Simulate adding an item priced at $2.00 on average for the demo
    cartTotal += 2.00; 

    // Update the UI
    document.getElementById('item-count').innerText = `${cartCount} items in cart`;
    document.getElementById('cart-total').innerText = `$${cartTotal.toFixed(2)}`;

    // Optional: Add a simple haptic/visual feedback
    alert("Item added to your cart successfully!");
}
