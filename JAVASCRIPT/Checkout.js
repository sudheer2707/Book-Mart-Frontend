// checkout.js — robust, debug-friendly, drop-in replacement
document.addEventListener("DOMContentLoaded", () => {
  // elements (may or may not exist depending on your HTML)
  const bookImage = document.getElementById("book-image");
  const bookTitle = document.getElementById("book-title");
  const bookPrice = document.getElementById("book-price");
  const bookDetailsContainer = document.querySelector(".book-details");

  // debug helper
  function log(...args) {
    if (window && window.console) console.log("[checkout.js]", ...args);
  }

  // Load stored data
  const rawCheckout = localStorage.getItem("checkoutItems");
  const rawSelected = localStorage.getItem("selectedBook");

  log("rawCheckout:", rawCheckout);
  log("rawSelected:", rawSelected);

  let checkoutItems = [];
  try {
    if (rawCheckout) checkoutItems = JSON.parse(rawCheckout) || [];
  } catch (e) {
    log("Failed to parse checkoutItems:", e);
    checkoutItems = [];
  }

  let selectedBook = null;
  try {
    if (rawSelected) selectedBook = JSON.parse(rawSelected);
  } catch (e) {
    log("Failed to parse selectedBook:", e);
    selectedBook = null;
  }

  // If selectedBook exists but checkoutItems is empty, prefer checkoutItems if it has items.
  // If checkoutItems empty and selectedBook exists, convert selectedBook into an array.
  if ((!checkoutItems || checkoutItems.length === 0) && selectedBook) {
    checkoutItems = [selectedBook];
    log("Normalized selectedBook -> checkoutItems (1 item).");
  }

  // Render logic
  if (!bookDetailsContainer) {
    log("No .book-details container found in DOM. Aborting display logic.");
  } else if (checkoutItems.length === 0) {
    // nothing to show
    bookDetailsContainer.innerHTML = `<p style="text-align:center; color: #e3f2fd; margin:18px 0;">No items found for checkout 😔</p>`;
    if (bookImage) bookImage.style.display = "none";
    if (bookTitle) bookTitle.textContent = "No items";
    if (bookPrice) bookPrice.textContent = "";
    log("No checkout items to display.");
  } else if (checkoutItems.length === 1) {
    // single item — keep original image/title/price layout if present
    const item = checkoutItems[0];
    log("Rendering single checkout item:", item);
    if (bookImage && item.image) { bookImage.src = item.image; bookImage.style.display = ""; }
    if (bookTitle) bookTitle.textContent = item.title || "Unnamed";
    if (bookPrice) bookPrice.textContent = `₹${Number(item.price || 0)}`;
    // If you prefer, also ensure the .book-details still shows correctly — do nothing else
  } else {
    // multiple items — build a list inside .book-details
    log("Rendering multiple checkout items:", checkoutItems.length);
    bookDetailsContainer.innerHTML = ""; // clear placeholder

    let total = 0;
    checkoutItems.forEach(item => {
      const priceNum = Number(item.price) || 0;
      total += priceNum;

      const div = document.createElement("div");
      div.className = "checkout-item";
      div.innerHTML = `
        <img src="${item.image || ''}" alt="${(item.title||'')}" style="width:60px;height:80px;object-fit:cover;border-radius:6px;margin-right:12px;">
        <div style="flex:1;">
          <h4 style="margin:0 0 6px 0;color:#e3f2fd;">${item.title || 'Untitled'}</h4>
          <p style="margin:0;color:#90e0ef;">₹${priceNum.toFixed(2)}</p>
        </div>
      `;
      // style wrapper to align horizontally
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "space-between";
      wrapper.style.padding = "10px 8px";
      wrapper.style.background = "rgba(255,255,255,0.03)";
      wrapper.style.borderRadius = "10px";
      wrapper.style.marginBottom = "10px";

      wrapper.appendChild(div);
      bookDetailsContainer.appendChild(wrapper);
    });

    // show total
    const totalEl = document.createElement("h3");
    totalEl.textContent = `Total: ₹${total.toFixed(2)}`;
    totalEl.style.marginTop = "12px";
    totalEl.style.textAlign = "center";
    totalEl.style.color = "#e3f2fd";
    bookDetailsContainer.appendChild(totalEl);

    // hide single-book image/title/price if present (optional)
    if (bookImage) bookImage.style.display = "none";
    if (bookTitle) bookTitle.textContent = `${checkoutItems.length} item(s) in your order`;
    if (bookPrice) bookPrice.textContent = `Total: ₹${total.toFixed(2)}`;
  }

  // -------------------------
  // rest of your existing code
  // -------------------------
  // (kept as-is from your original file; no structural changes)
  const cod = document.getElementById("cod");
  const upi = document.getElementById("upi");
  const card = document.getElementById("card");

  const upiInput = document.querySelector(".upi-input");
  const cardInput = document.querySelector(".card-input");

  const promoInput = document.getElementById("promo-input");
  const applyPromoBtn = document.getElementById("apply-promo");
  const copyBtns = document.querySelectorAll(".copy-btn");

  // Toggle payment sections
  document.querySelectorAll('input[name="payment"]').forEach((input) => {
    input.addEventListener("change", () => {
      if (upiInput) upiInput.classList.add("hidden");
      if (cardInput) cardInput.classList.add("hidden");

      if (upi && upi.checked && upiInput) upiInput.classList.remove("hidden");
      if (card && card.checked && cardInput) cardInput.classList.remove("hidden");
    });
  });

  // Copy promo codes
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.dataset.code;
      navigator.clipboard.writeText(code);
      alert(`Promo code ${code} copied!`);
    });
  });

  // Apply promo code
  if (applyPromoBtn && promoInput) {
    applyPromoBtn.addEventListener("click", () => {
      const enteredCode = promoInput.value.trim().toUpperCase();
      if (enteredCode === "BOOK10") {
        alert("BOOK10 applied – You got 10% off!");
      } else if (enteredCode === "NEW25") {
        alert("NEW25 applied – You got 25% off!");
      } else {
        alert("Invalid promo code");
      }
    });
  }

  // Confirm Order
  const confirmBtn = document.querySelector(".confirm-btn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (cod && cod.checked) {
        alert("Your order has been placed with Cash on Delivery!");
      } else if (upi && upi.checked) {
        const upiIdEl = document.getElementById("upi-id");
        const upiId = upiIdEl ? upiIdEl.value : "";
        if (upiId) alert(`Payment successful via ${upiId}`);
        else alert("Please enter a valid UPI ID!");
      } else if (card && card.checked) {
        alert("Card payment successful!");
      }
    });
  }

}); // DOMContentLoaded end
