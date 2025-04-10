const imageInput = document.getElementById("image");
const imagePreview = document.getElementById("imagePreview");
const previewContainer = document.getElementById("previewContainer");
const imageError = document.getElementById("imageError");

const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
const maxSizeMB = 3;

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  imageError.style.display = "none";

  if (file) {
    // Validate file type
    if (!validTypes.includes(file.type)) {
      imageError.innerText = "❌ Only JPG, PNG, and WebP files are allowed.";
      imageError.style.display = "block";
      previewContainer.style.display = "none";
      return;
    }

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      imageError.innerText = `❌ File size should be less than ${maxSizeMB}MB.`;
      imageError.style.display = "block";
      previewContainer.style.display = "none";
      return;
    }

    // Show image preview
    const reader = new FileReader();
    reader.onload = function (event) {
      imagePreview.src = event.target.result;
      previewContainer.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    // No file selected
    previewContainer.style.display = "none";
    imagePreview.src = "#";
  }
});
