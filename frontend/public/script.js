document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const status = document.getElementById("status");

  status.textContent = "Uploading...";

  try {
    const res = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    status.textContent = data.message;
  } catch (err) {
    status.textContent = "Upload failed: " + err.message;
  }
});
