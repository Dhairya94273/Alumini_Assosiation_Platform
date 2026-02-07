const express = require("express");
const router = express.Router();
const connection = require("../db/connection");
const auth = require("../middleware/authMiddleware");

router.get("/admin/events", auth, (req, res) => {
  connection.query("SELECT * FROM events", (err, results) => {
    res.render("events", { events: results });
  });
});

router.post("/admin/events/add", auth, (req, res) => {
  const { event_name, event_date, location, description } = req.body;

  connection.query(
    "INSERT INTO events VALUES (NULL,?,?,?,?)",
    [event_name, event_date, location, description],
    () => res.redirect("/admin/events")
  );
});

module.exports = router;
