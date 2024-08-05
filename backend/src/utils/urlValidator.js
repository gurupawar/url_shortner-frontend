function isValidUrl(url) {
  const urlRegex =
    /^(https?|ftp):\/\/(?:(?:[a-z0-9$\-_.+!*'(),;?&=%#]|%[0-9a-f]{2})+@)?(?:[a-z0-9\-]+\.){1,}(?:[a-z]{2,})(?:\/[^\/\s]*)*$/;
  return urlRegex.test(url);
}

module.exports = { isValidUrl };
