document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".sell-form");
  const fileInput = document.getElementById("bookImage");

  // Create a container for image previews
  const previewContainer = document.createElement("div");
  previewContainer.classList.add("image-preview-container");
  fileInput.insertAdjacentElement("afterend", previewContainer);

  fileInput.addEventListener("change", function (event) {
    previewContainer.innerHTML = ""; // Clear any existing previews
    const files = Array.from(event.target.files);

    if (files.length > 4) {
      alert("⚠️ You can only upload up to 4 images.");
      fileInput.value = "";
      return;
    }

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return; // Skip non-image files

      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.classList.add("preview-image");
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("✅ Thank you! Your book has been submitted for review.");
    form.reset();
    previewContainer.innerHTML = "";
  });
});
