// Modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const contactRoutes = require("./routes/contactRoutes");

// Init app
const app = express();

// Set veiw engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../client/views"));

// Middlware
app.use(express.static(path.join(__dirname, "../client/public")));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/mainRoutes"));
app.use("/", contactRoutes); // Load contact routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
