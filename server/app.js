const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
const videoRoutes = require("../server/src/routes/videoRoutes"); // Importa las rutas de videos
const userRoutes = require("../server/src/routes/userRoutes"); // Importa las rutas de usuarios
const db = require("../server/src/database"); // Importa la conexión a la base de datos
app.use(cors({ origin: "http://localhost:3000" }));// Enlace a la app React
const videoReproductorRouter = require("../server/src/routes/videoReproductorRoute")
const jwt = require('jsonwebtoken');

// Configuración de rutas
app.use(express.json()); // Este middleware analiza el cuerpo de la solicitud en formato JSON
app.use(express.urlencoded({ extended: true })); // Este middleware analiza el cuerpo de la solicitud en formato de datos codificados
// app.use("/videos", videoRoutes); // Todas las rutas relacionadas con videos comienzan con /videos
app.use("/usuarios", userRoutes); // Todas las rutas relacionadas con usuarios comienzan con /usuarios
app.use("/videos",videoRoutes)
app.use('/video', express.static('/root'),videoReproductorRouter);


// Define la clave secreta
const secretKey = 'tu_secreto_real'; // Reemplaza 'tu_secreto_real' con tu clave secreta real

// Middleware para verificar el token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token.replace('Bearer ', ''), secretKey, (error, decoded) => {
      if (error) {
        res.status(401).json({ mensaje: 'Token inválido' });
      } else {
        req.usuario = decoded;
        next();
      }
    });
  } else {
    res.status(403).json({ mensaje: 'Token no proporcionado' });
  }
}

app.get('/verificar-autenticacion', verificarToken, (req, res) => {
  // El middleware verificarToken ya se encargó de verificar el token y agregarlo a req.usuario
  res.status(200).json({ mensaje: 'El usuario está autenticado' });
});



app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
