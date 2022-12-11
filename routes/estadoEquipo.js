const express = require('express');
const router = express.Router();
const { 
    getEstados,
    createEstadoEquipo,
    updateEstadoEquipo,
    deleteEstadoEquipo
 } = require('../controllers/estadoEquipo');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const { check } = require('express-validator');

router.get('/', [ validarJWT ], getEstados);
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], createEstadoEquipo);
router.put('/', [
    check('id', 'invalid.id').not().isEmpty(),
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], updateEstadoEquipo);
router.delete('/', [
    check('id', 'invalid.id').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], deleteEstadoEquipo);

module.exports = router;