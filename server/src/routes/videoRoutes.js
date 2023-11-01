const express = require("express");
const router = express.Router();
const db = require("../database"); // Importa el módulo de acceso a la base de datos

// Ruta para obtener todos los videos
router.get("/select_videos", (req, res) => {
  // Realiza una consulta a la base de datos para obtener todos los videos
  const query = "SELECT * FROM Contenido";
  db.query(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Error en la base de datos" });
    }

    return res.status(200).json(results); // Devuelve los videos como respuesta en formato JSON
  });
});

router.get('/reproducir-video/:nombreVideo', (req, res) => {
    const videoName = req.params.nombreVideo; // Parámetro que especifica el nombre del video
    const videoUrl = `/root/${videoName}`; // Construye la URL del video
    res.json({ videoUrl });
  });

module.exports = router;
