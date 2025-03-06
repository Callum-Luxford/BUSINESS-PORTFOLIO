const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/contactController");

router.post("/contact", sendMessage); // Route to handle form submissions

module.exports = router;
