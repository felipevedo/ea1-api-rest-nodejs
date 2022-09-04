const express = require('express');
const router = express.Router();
const {
    getUsuarios,
    createUsuario,
    updateUsuario
} = require('../controllers/usuario');

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/', updateUsuario);

module.exports = router;