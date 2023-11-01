const express = require('express');
const router = express.Router();
const db = require('../database'); // Importa el módulo de acceso a la base de datos
const jwt = require('jsonwebtoken');


// Define la clave secreta
const secretKey = 'tu_secreto_real'; // Reemplaza 'tu_secreto_real' con tu clave secreta real


// Ruta para el inicio de sesión
router.post('/login', (req, res) => {
  const { email, password } = req.body; // Obtén el correo electrónico y la contraseña del cuerpo de la solicitud

  // Realiza una consulta a la base de datos para verificar el usuario
  const query = 'SELECT * FROM Usuario WHERE Correo = ? AND Contrasena = ?';
  db.query(query, [email, password], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 1) {
      // Usuario válido, inicia sesión
      // Genera un token JWT y establece el tiempo de expiración
      const usuario = {
        id: results[0].IDUsuario, // Incluye datos que desees en el token
        email: email,
      };
      const token = jwt.sign(usuario, secretKey, { expiresIn: '1h' }); // El token expira en 1 hora

      return res.status(200).json({ message: 'Inicio de sesión exitoso' , token});
    } else {
      // Usuario no válido
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  });
});



// Ruta para el registro de usuarios
router.post('/registro', (req, res) => {
  const { nombre, email, contrasena } = req.body;

  // Verifica si el usuario ya existe en la base de datos
  const checkUserQuery = 'SELECT * FROM Usuario WHERE Correo = ?';
  db.query(checkUserQuery, [email], (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: 'El usuario ya existe' });
    }

    // Si el usuario no existe, registra al nuevo usuario
    const insertUserQuery = 'INSERT INTO Usuario (IDUsuario, NombreUsuario, Correo, Contrasena, Historial) VALUES (?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [null, nombre, email, contrasena, "[]"], (error) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el registro' });
      }
      return res.status(201).json({ message: 'Registro exitoso' });
    });
  });
});

module.exports = router;


