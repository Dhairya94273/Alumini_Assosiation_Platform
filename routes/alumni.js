const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const auth = require("../middleware/authMiddleware");

// Dashboard
router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

// Directory
router.get("/directory", auth, (req, res) => {
  connection.query("SELECT * FROM alumni", (err, results) => {
    res.render("directory", { alumni: results });
  });
});

// Jobs
router.get("/jobs", auth, (req, res) => {
  connection.query("SELECT * FROM jobs", (err, results) => {
    res.render("jobs", { jobs: results });
  });
});

// Donate
router.get("/donate", auth, (req, res) => {
  res.render("donate");
});

router.post("/donate", auth, (req, res) => {
  const { amount, purpose } = req.body;
  connection.query(
    "INSERT INTO donations (amount, purpose) VALUES (?,?)",
    [amount, purpose],
    () => res.redirect("/dashboard")
  );
});

module.exports = router;
