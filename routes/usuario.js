const express = require('express');
const router = express.Router();
const {
    getUsuarios,
    createUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/usuario');

router.get('/', getUsuarios);
router.post('/', createUsuario);
router.put('/', updateUsuario);
router.delete('/', deleteUsuario);

module.exports = router;