const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
app.use(cookieParser());

// ✅ Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

app.use("/auth", authRoutes);
app.use("/products", productRoutes); // <-- This is critical

app.get("/", (req, res) => {
  res.send("Shopify App Running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const videoRoutes = require("./routes/videos");
app.use("/videos", videoRoutes);