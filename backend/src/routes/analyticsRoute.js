const express = require("express");
const Url = require("../models/url");
const { authenticateToken } = require("../service/auth");

const router = express.Router();

// API endpoint to get the data for a short URL
router.get("/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const existingShortUrl = await Url.findById({ _id: id });

    if (!existingShortUrl) {
      return res.status(400).json({ error: "Invalid short URL" });
    } else {
      res.status(200).json({ url: existingShortUrl });
    }
  } catch (error) {
    console.error("Error occurred while fetching URL:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
