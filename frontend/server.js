const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// 🔑 absolute path (Windows-safe)
const dashboardDist = path.resolve(__dirname, "dashboard", "dist");

// Serve static assets
app.use("/dashboard", express.static(dashboardDist));

// SPA fallback
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(dashboardDist, "index.html"));
});

app.get("/dashboard/*", (req, res) => {
  res.sendFile(path.join(dashboardDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Dashboard → http://localhost:${PORT}/dashboard`);
});
