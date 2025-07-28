const express = require("express");
const router = express.Router();

// In-memory storage for video links
let videoLinks = {}; // Format: { productId: [video1, video2] }

router.post("/add", express.json(), (req, res) => {
  const { productId, videoUrl } = req.body;

  if (!productId || !videoUrl) {
    return res.status(400).send("Missing productId or videoUrl");
  }

  if (!videoLinks[productId]) {
    videoLinks[productId] = [];
  }

  videoLinks[productId].push(videoUrl);
  res.send({ message: "✅ Video added", productId, videoUrl });
});

router.get("/get/:productId", (req, res) => {
  const { productId } = req.params;
  const videos = videoLinks[productId] || [];
  res.json({ productId, videos });
});

module.exports = router;