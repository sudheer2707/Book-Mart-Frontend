// ---------- PROFILE IMAGE UPLOAD ----------
const uploadBtn = document.getElementById("change-pic-btn");
const fileInput = document.getElementById("upload-img");
const profileImg = document.getElementById("profile-img");

uploadBtn.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      profileImg.src = reader.result;
      localStorage.setItem("userProfilePic", reader.result);
    };
    reader.readAsDataURL(file);
  }
});

// Load saved image
const savedImg = localStorage.getItem("userProfilePic");
if (savedImg) profileImg.src = savedImg;


// ---------- SIDEBAR NAVIGATION ----------
const sidebarItems = document.querySelectorAll(".sidebar-menu li");
const contentArea = document.getElementById("profile-content");

const sections = {
  orders: `
    <div class="detail-card glass">
      <h3>My Orders</h3>
      <p>You have 2 active orders.</p>
      <button>Track Orders</button>
    </div>
  `,
  sold: `
    <div class="detail-card glass">
      <h3>Sold Books</h3>
      <p>You have sold 4 books successfully.</p>
      <button>View Details</button>
    </div>
  `,
  settings: `
    <div class="detail-card glass">
      <h3>Account Settings</h3>
      <button>Edit Profile</button>
      <button>Logout</button>
    </div>
  `
};

// Default section
contentArea.innerHTML = sections.orders;

// Change content when sidebar is clicked
sidebarItems.forEach(item => {
  item.addEventListener("click", () => {
    sidebarItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");

    const section = item.getAttribute("data-section");
    contentArea.innerHTML = sections[section];
  });
});
