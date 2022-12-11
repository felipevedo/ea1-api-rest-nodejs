const express = require('express');
const router = express.Router();
const { 
    getTipos,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo,
 } = require('../controllers/tipoEquipo');
 const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const { check } = require('express-validator');

router.get('/', [ validarJWT ], getTipos);
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], createTipoEquipo);
router.put('/', [
    check('id', 'invalid.id').not().isEmpty(),
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], updateTipoEquipo);
router.delete('/', [
    check('id', 'invalid.id').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], deleteTipoEquipo);

module.exports = router;