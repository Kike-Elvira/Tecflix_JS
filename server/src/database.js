// database.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "192.168.0.65",
  port: 3306,
  user: "backend",
  password: "root2001",
  database: "TECFLIX",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión a la base de datos exitosa");
  }
});

module.exports = db;
