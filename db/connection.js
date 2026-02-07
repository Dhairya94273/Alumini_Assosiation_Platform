const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dhairya@1707",
  database: "alumni_db"
});

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed ❌");
    console.error(err.message);
  } else {
    console.log("Connected to MySQL Database ✅");
  }
});

module.exports = connection;
