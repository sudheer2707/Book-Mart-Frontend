document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // ✅ Load cart from localStorage (ensure it's always an array)
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-msg">Your cart is empty 😔</p>`;
  } else {
    let total = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
      total += Number(item.price) || 0; // ensure numeric value

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h4>${item.title}</h4>
        <span class="price">₹${item.price}</span>
        <button class="remove-btn" data-index="${index}">Remove</button>
      `;

      cartItemsContainer.appendChild(cartItem);
    });

    totalPriceElement.textContent = total.toFixed(2);

    // ✅ Remove item
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        window.location.reload();
      });
    });
  }

  // ✅ Checkout redirect
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty 😔");
      return;
    }

    // Save items for checkout page
    localStorage.setItem("checkoutItems", JSON.stringify(cart));

    // Redirect to Checkout page
    window.location.href = "/HTML/Checkout.html";
  });
});
