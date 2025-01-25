const express = require("express");
// const axios = require("axios");
const User = require("../models/user");
const ShortUniqueId = require("short-unique-id");
const { isValidUrl } = require("../utils/urlValidator");
const { isValidExpirationDate } = require("../utils/expirationValidator");
const Url = require("../models/url");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../service/auth");
const { secret_jwt } = require("../config/config");

const router = express.Router();

// API endpoint to shorten a URL
// localhost:3000/api/shorten/new
// {
//   "originalUrl": "https://www.example.in",
//   "expirationDate": "2024-12-31"
// }

router.post("/new", authenticateToken, async (req, res) => {
  const { originalUrl, expirationDate, customKeyword } = req.body;
  const token = req.headers["authorization"];

  try {
    // Decode JWT Token
    const decode = jwt.verify(token, secret_jwt);
    const userdd = await User.findById(decode._id);

    if (!userdd) {
      return res
        .status(400)
        .json({ message: "You are not logged in", status: 400 });
    }

    // Validate URL format
    if (!isValidUrl(originalUrl)) {
      const isContained =
        originalUrl.startsWith("https://") || originalUrl.startsWith("http://");
      const errorMessage = isContained
        ? "Invalid URL"
        : "The URL is invalid as it does not contain https:// or http://";
      return res.status(400).json({ message: errorMessage, status: 400 });
    }

    // Check if the custom keyword is already in use
    if (customKeyword) {
      const existingUrlWithCustomKeyword = await Url.findOne({ customKeyword });
      if (existingUrlWithCustomKeyword) {
        return res
          .status(400)
          .json({ message: "Custom keyword already in use", status: 400 });
      }
    }

    // Validate expiration date if provided
    if (expirationDate && !isValidExpirationDate(expirationDate)) {
      return res
        .status(400)
        .json({ message: "Invalid expiration date", status: 400 });
    }

    // Generate a short ID if no custom keyword is provided
    const { randomUUID } = new ShortUniqueId({ length: 10 });
    const shortUrl = customKeyword || randomUUID();

    // Construct new URL object
    const newUrlData = {
      user: decode._id,
      originalUrl,
      shortUrl,
      expirationDate,
      createdAt: Date.now(),
    };

    // ✅ Only set `customKeyword` if provided (prevents null issue)
    if (customKeyword) {
      newUrlData.customKeyword = customKeyword;
    }

    const newUrl = new Url(newUrlData);
    await newUrl.save();

    res.status(201).json({ message: "success", newUrl, status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

module.exports = router;
