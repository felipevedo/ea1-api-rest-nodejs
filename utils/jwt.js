const jwt = require('jsonwebtoken');
const { findRoleNameById } = require('./misc');

const generarJWT = (user) => {
  const payload = {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    rol: findRoleNameById(user.idRol)
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = {
  generarJWT
}