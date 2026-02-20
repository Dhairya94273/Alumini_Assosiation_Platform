const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err) => {
  if (err) {
    console.error("Database connection failed ❌");
    console.error(err);
  } else {
    console.log("Connected to Railway MySQL ✅");
  }
});

module.exports = connection;