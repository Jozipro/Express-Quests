const express = require("express");
const mysql = require("mysql");
require("dotenv").config();

const app = express();

// Connexion à la BDD
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// Route pour récupérer tous la liste des utilisateurs
app.get("/api/users", (req, res) => {
  connection.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error getting data from database");
    } else {
      res.status(200).json(result);
    }
  });
});

// Route pour récupérer un utilisateur d'après son id
app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  connection.query("SELECT * FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error getting data from database");
    } else if (result.length === 0) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Démarrage du serveur
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
