const express = require('express');
const router = express.Router();
const {
    getMarcas,
    createMarca,
    updateMarca,
    deleteMarca
} = require('../controllers/marca');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const { check } = require('express-validator');

router.get('/', [ validarJWT ], getMarcas);
router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], createMarca);
router.put('/', [
    check('id', 'invalid.id').not().isEmpty(),
    check('name', 'invalid.name').not().isEmpty(),
    check('status', 'invalid.status').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], updateMarca);
router.delete('/', [
    check('id', 'invalid.id').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], deleteMarca);

module.exports = router;