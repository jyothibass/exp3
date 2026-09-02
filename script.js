const products = [
  { id: 1, name: "Smart Watch", description: "Modern fitness smartwatch", price: 1999, icon: "⌚" },
  { id: 2, name: "Headphones", description: "Wireless stereo headphones", price: 1499, icon: "🎧" },
  { id: 3, name: "Running Shoes", description: "Comfortable sports shoes", price: 2499, icon: "👟" },
  { id: 4, name: "Backpack", description: "Lightweight everyday backpack", price: 999, icon: "🎒" },
  { id: 5, name: "Sunglasses", description: "Stylish UV protection glasses", price: 799, icon: "🕶️" },
  { id: 6, name: "Camera", description: "Compact digital camera", price: 8999, icon: "📷" }
];

let cart = JSON.parse(localStorage.getItem("simpleShopCart")) || [];

const productGrid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");

function renderProducts() {
  productGrid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image">${product.icon}</div>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <span class="price">₹${product.price.toLocaleString("en-IN")}</span>
      <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem("simpleShopCart", JSON.stringify(cart));
}

function renderCart() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = count;
  cartTotal.textContent = total.toLocaleString("en-IN");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        <strong>${item.name}</strong>
        <p>₹${item.price.toLocaleString("en-IN")} × ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    </div>
  `).join("");
}

function openCart() {
  cartPanel.classList.add("open");
  overlay.classList.add("show");
}

function closeCart() {
  cartPanel.classList.remove("open");
  overlay.classList.remove("show");
}

document.getElementById("cartBtn").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  alert("Thank you for your order! This is a demo checkout.");
  cart = [];
  saveCart();
  renderCart();
  closeCart();
});

renderProducts();
renderCart();
