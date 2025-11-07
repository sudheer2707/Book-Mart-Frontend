document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Update cart count on page load
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) cartCountEl.textContent = cart.length;
  }

  updateCartCount();

  // 🔹 Handle "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".cart-btn");

  addToCartButtons.forEach(button => {
    button.addEventListener("click", event => {
      const bookCard = event.target.closest(".book-card");

      const title = bookCard.querySelector("h3").textContent;
      const priceText = bookCard.querySelector(".price").textContent.replace("₹", "").trim();
      const price = parseFloat(priceText);
      const image = bookCard.querySelector("img").src;

      const item = { title, price, image };

      // Retrieve current cart
      const cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Prevent duplicates
      const exists = cart.some(book => book.title === item.title);
      if (exists) {
        alert(`${item.title} is already in your cart.`);
        return;
      }

      // Add new item
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${item.title} added to cart 🛒`);

      updateCartCount();
    });
  });

  // 🔹 Handle "Buy Now" buttons
  const buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(button => {
    button.addEventListener("click", event => {
      const bookCard = event.target.closest(".book-card");

      const title = bookCard.querySelector("h3").textContent;
      const priceText = bookCard.querySelector(".price").textContent.replace("₹", "").trim();
      const price = parseFloat(priceText);
      const image = bookCard.querySelector("img").src;

      const selectedBook = { title, price, image };

      // Save as checkout item (new array)
      localStorage.setItem("checkoutItems", JSON.stringify([selectedBook]));

      // Redirect to checkout page
      window.location.href = "/HTML/Checkout.html";
    });
  });
});
