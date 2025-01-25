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
    const decode = jwt.verify(token, secret_jwt);

    const user = await User.findOne({ _id: decode._id });
    if (!user) {
      return res
        .status(400)
        .json({ message: "You are not logged in", status: 400 });
    }

    // Validate URL
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({
        message: "Invalid URL. Make sure it includes https:// or http://",
        status: 400,
      });
    }

    // Check if custom keyword already exists
    if (customKeyword) {
      const existingUrl = await Url.findOne({ customKeyword });
      if (existingUrl) {
        return res
          .status(400)
          .json({ message: "Custom keyword already in use", status: 400 });
      }
    }

    // Validate expiration date
    if (expirationDate && !isValidExpirationDate(expirationDate)) {
      return res
        .status(400)
        .json({ message: "Invalid expiration date", status: 400 });
    }

    // Generate unique shortUrl
    const shortUUID = new ShortUniqueId({ length: 10 });
    const shortUrl = customKeyword || shortUUID();

    // Save to database
    const newUrl = new Url({
      user: decode._id,
      originalUrl,
      shortUrl,
      expirationDate,
      customKeyword,
      createdAt: Date.now(),
    });

    await newUrl.save();

    res.status(201).json({ message: "Success", newUrl, status: 201 });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error", status: 500 });
  }
});

module.exports = router;
