const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "devu@234", // change if needed
  database: "aradhana_db"
});

db.connect(err => {
  if (err) {
    console.log("❌ DB Error:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ API
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contacts (name,email,message) VALUES (?,?,?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Database error");
    }
    res.send("Saved successfully");
  });
});

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});