const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
require("dotenv").config();


const connection = require("./db/connection");

// ======================
// VIEW ENGINE
// ======================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ======================
// MIDDLEWARE
// ======================
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// SESSION CONFIG
app.use(
  session({
    secret: "alumni_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// ⭐ VERY IMPORTANT
// Make session user available in ALL EJS files (for header)
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// ======================
// ROUTES
// ======================

// Default → always login
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Auth routes (login, register, logout)
app.use("/", require("./routes/auth"));

// Alumni protected routes
app.use("/", require("./routes/alumni"));

// Admin protected routes
app.use("/", require("./routes/admin"));

// ======================
// SERVER
// ======================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
