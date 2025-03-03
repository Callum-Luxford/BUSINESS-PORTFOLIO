const express = require("express");
const router = express.Router();

// Home page (SIngle page layout)
router.get("/", (req, res) => {
  res.render("layouts/main", { title: "Home" });
});

module.exports = router;
