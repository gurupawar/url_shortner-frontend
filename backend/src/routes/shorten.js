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
  const { originalUrl, expirationDate, customKeyword, user } = req.body;
  const token = req.headers["authorization"];

  const decode = jwt.verify(token, secret_jwt);

  try {
    const userdd = await User.findOne({ _id: decode._id });

    if (userdd === null) {
      return res
        .status(400)
        .json({ message: "You are not logged in", status: 400 });
    }

    // Check if the URL is valid
    if (!isValidUrl(originalUrl)) {
      let conditionalMessage = "";

      const isContained =
        originalUrl.startsWith("https://") || originalUrl.startsWith("http://");

      if (isContained !== true)
        conditionalMessage =
          "The URL is invalid as it does not contain  https:// or http://";
      return res.status(400).json({
        message: conditionalMessage || "Invalid URL",
        status: 400,
      });
    }

    try {
      // const response = await axios.head(originalUrl);

      // // Check if the response status code indicates success (2xx or 3xx)
      // if (!(response.status >= 200 && response.status < 400)) {
      //   return res
      //     .status(400)
      //     .json({ message: "Invalid or inaccessible URL", status: 400 });
      // }

      // Check if the custom keyword is already in use
      if (customKeyword !== undefined && customKeyword !== "") {
        const existingUrlWithCustomKeyword = await Url.findOne({
          customKeyword,
        });
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

      // Generate a short ID for the URL if no custom keyword is provided
      const { randomUUID } = new ShortUniqueId({ length: 10 });
      const shortUrl = customKeyword || randomUUID();

      const newUrl = new Url({
        user: decode._id,
        originalUrl,
        shortUrl,
        expirationDate,
        customKeyword,
        createdAt: Date.now(),
      });
      await newUrl.save();

      // Respond with the shortened URL
      res.status(201).json({ message: "success", newUrl, status: 201 });
    } catch (error) {
      console.error("Error verifying URL:", error.message);
      return res
        .status(400)
        .json({ message: "Invalid or inaccessible URL", status: 400 });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", status: 500 });
  }
});

module.exports = router;
