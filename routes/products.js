const express = require("express");
const axios = require("axios");
const router = express.Router();

let accessTokens = {}; // In-memory storage

// TEMP SETTER: Store token manually
router.get("/set-token", (req, res) => {
  const { shop, token } = req.query;

  if (!shop || !token) {
    return res.status(400).send("Missing shop or token");
  }

  accessTokens[shop] = token;
  res.send("✅ Access token set for " + shop);
});

// GET: Fetch products from Shopify
router.get("/list", async (req, res) => {
  const { shop } = req.query;
  const token = accessTokens[shop];

  if (!shop || !token) {
    return res.status(400).send("Missing shop or token");
  }

  try {
    const productsRes = await axios.get(`https://${shop}/admin/api/2024-01/products.json`, {
      headers: {
        "X-Shopify-Access-Token": token,
        "Content-Type": "application/json",
      },
    });

    res.json(productsRes.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch products");
  }
});

module.exports = router;