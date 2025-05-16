const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update UI with saved cart data
updateCartUI();

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productEl = e.target.closest('.product');
    const productId = productEl.dataset.id;
    const productName = productEl.querySelector('h3').textContent;

    addToCart(productId, productName);
  });
});

function addToCart(id, name) {
  // Check if item already in cart
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, quantity: 1 });
  }

  // Save cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  updateCartUI();
}

function updateCartUI() {
  cartCountEl.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  cartItemsEl.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x ${item.quantity}`;
    cartItemsEl.appendChild(li);
  });
}
