const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // ✅ Add this if not already installed

dotenv.config();

const app = express();
app.use(cors()); // ✅ Enable CORS for frontend access
app.use(express.json()); // ✅ Add to parse JSON bodies
app.use(cookieParser());

// ✅ Import routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const videoRoutes = require("./routes/videos");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/videos", videoRoutes);

app.get("/", (req, res) => {
  res.send("Shopify App Running");
});

// ✅ Use dynamic port (important for Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
