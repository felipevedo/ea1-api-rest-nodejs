const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { query } = require('../utils/dbUtils');
const { findRoleNameById } = require('../utils/misc');
const { generarJWT } = require('../utils/jwt');

module.exports = {
  authorize: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
      }

      const { email, contrasena } = req.body;

      const existeEmail = await query(`SELECT * FROM usuarios WHERE email = '${email}'`);
      if (existeEmail.length === 0) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      const usuario = existeEmail[0];
      const esIgual = bcrypt.compareSync(contrasena, usuario.contrasena);
      if (!esIgual) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
      }

      const token = generarJWT(usuario);

      res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        rol: findRoleNameById(usuario.idRol),
        email: usuario.email,
        accessToken: token
      });
    } catch {
      console.log('My server log error: ', e)
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};