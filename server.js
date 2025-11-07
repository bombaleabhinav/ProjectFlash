const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// Static files
app.use(express.static("public"));

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Route to handle upload
app.post("/upload", upload.fields([
  { name: "csvFile", maxCount: 1 },
  { name: "imageFile", maxCount: 1 },
  { name: "videoFile", maxCount: 1 }
]), (req, res) => {
  console.log("Files uploaded:", req.files);
  res.json({ message: "Files uploaded successfully!" });
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
