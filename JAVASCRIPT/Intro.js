const fadeScreen = document.querySelector(".fade-screen");

setTimeout(() => {
  fadeScreen.style.opacity = "1"; // fade-out transition
}, 3200);

setTimeout(() => {
  window.location.href = "index.html"; // redirect to homepage
}, 4200);
