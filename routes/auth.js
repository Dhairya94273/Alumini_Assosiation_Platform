const express = require("express");
const router = express.Router();
const connection = require("../db/connection"); // your MySQL connection

// --------------------
// LOGIN ROUTES
// --------------------
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM alumni WHERE email=? AND password=?";
  connection.query(sql, [email, password], (err, results) => {
    if (err) return res.send("Database error");

    if (results.length === 0) {
      return res.send("Invalid email or password");
    }

    // Save user info in session
    req.session.user = results[0]; 
    res.redirect("/dashboard");
  });
});

// --------------------
// REGISTER ROUTES
// --------------------
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, email, password, graduation_year, department } = req.body;

  const sql = `
    INSERT INTO alumni (name, email, password, graduation_year, department)
    VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(sql, [name, email, password, graduation_year, department], (err) => {
    if (err) return res.send("Registration failed");
    res.redirect("/login");
  });
});

// --------------------
// LOGOUT ROUTE
// --------------------
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res.send("Error logging out");
    }
    res.redirect("/login");
  });
});

// --------------------
// DELETE ACCOUNT ROUTE
// --------------------
router.post("/delete-account", (req, res) => {
  const userEmail = req.session.user?.email;

  if (!userEmail) return res.redirect("/login");

  const sql = "DELETE FROM alumni WHERE email=?";
  connection.query(sql, [userEmail], (err, result) => {
    if (err) return res.send("Error deleting account");

    req.session.destroy(err => {
      if (err) return res.send("Error logging out");
      res.send("Account deleted successfully!");
    });
  });
});

// --------------------
// DASHBOARD (protected example)
// --------------------
router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  res.render("dashboard", { user: req.session.user });
});

module.exports = router;