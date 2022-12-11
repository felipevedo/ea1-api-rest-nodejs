const express = require('express');
const router = express.Router();
const {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuario');
const { check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

router.get('/', [ validarJWT ], getUsuarios);
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('rol', 'invalid.rol').isIn(['ADMINISTRADOR', 'DOCENTE']),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], createUsuario);
router.put('/', [
    check('id', 'invalid.id').notEmpty().isInt(),
    check('name', 'invalid.name').notEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('contrasena', 'invalid.contrasena').not().isEmpty(),
    check('rol', 'invalid.rol').isIn(['ADMINISTRADOR', 'DOCENTE']),
    validarJWT,
    validarRolAdmin
], updateUsuario);
router.delete('/', [
    check('id', 'invalid.id').notEmpty().isInt(),
    validarJWT,
    validarRolAdmin
], deleteUsuario);

module.exports = router;