const jwt = require('jsonwebtoken');

// Middleware para verificar el token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (token) {
    jwt.verify(token, 'tu_secreto_real', (error, decoded) => {
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

module.exports = verificarToken;
