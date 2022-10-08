const express = require('express');
const router = express.Router();
const { 
    getTipos,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo,
 } = require('../controllers/tipoEquipo');

router.get('/', getTipos);
router.post('/', createTipoEquipo);
router.put('/', updateTipoEquipo);
router.delete('/', deleteTipoEquipo);

module.exports = router;