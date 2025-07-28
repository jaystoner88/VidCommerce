const express = require("express");
const axios = require("axios");
const router = express.Router();

const {
  SHOPIFY_API_KEY,
  SHOPIFY_API_SECRET,
  SHOPIFY_SCOPES,
  SHOPIFY_REDIRECT_URI,
} = process.env;

router.get("/", (req, res) => {
  const { shop } = req.query;
  if (!shop) return res.status(400).send("Missing shop parameter");

  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=${SHOPIFY_SCOPES}&redirect_uri=${SHOPIFY_REDIRECT_URI}`;

  return res.redirect(installUrl);
});

router.get("/callback", async (req, res) => {
  const { shop, code } = req.query;

  if (!shop || !code) return res.status(400).send("Missing parameters");

  try {
    const tokenRes = await axios.post(`https://${shop}/admin/oauth/access_token`, {
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    });

    const accessToken = tokenRes.data.access_token;
    console.log("? Access Token:", accessToken);

    // Save the token to your database here if needed
    res.send("?? Shopify App Installed Successfully!");
  } catch (err) {
    console.error("? Error exchanging token:", err.response?.data || err);
    res.status(500).send("OAuth error");
  }
});

module.exports = router;