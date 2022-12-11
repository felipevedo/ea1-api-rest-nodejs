const express = require('express');
const router = express.Router();
const {
    getInventario,
    createInventario,
    updateInventario,
    deleteInventario
} = require('../controllers/inventario');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');
const { check } = require('express-validator');

router.get('/', [ validarJWT ], getInventario);
router.post('/', [
    check('model', 'invalid.model').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
    check('photoUrl', 'invalid.photoUrl').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('buyDate', 'invalid.buyDate').not().isEmpty(),
    check('price', 'invalid.price').not().isEmpty(),
    check('userId', 'invalid.userId').not().isEmpty(),
    check('brandId', 'invalid.brandId').not().isEmpty(),
    check('stateId', 'invalid.stateId').not().isEmpty(),
    check('typeId', 'invalid.typeId').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], createInventario);
router.put('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('model', 'invalid.model').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
    check('photoUrl', 'invalid.photoUrl').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('buyDate', 'invalid.buyDate').not().isEmpty(),
    check('price', 'invalid.price').not().isEmpty(),
    check('userId', 'invalid.userId').not().isEmpty(),
    check('brandId', 'invalid.brandId').not().isEmpty(),
    check('stateId', 'invalid.stateId').not().isEmpty(),
    check('typeId', 'invalid.typeId').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], updateInventario);
router.delete('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    validarJWT,
    validarRolAdmin
], deleteInventario);

module.exports = router;