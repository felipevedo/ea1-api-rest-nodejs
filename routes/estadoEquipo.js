const express = require('express');
const router = express.Router();
const { 
    getEstados,
    createEstadoEquipo,
    updateEstadoEquipo,
    deleteEstadoEquipo
 } = require('../controllers/estadoEquipo');

router.get('/', getEstados);
router.post('/', createEstadoEquipo);
router.put('/', updateEstadoEquipo);
router.delete('/', deleteEstadoEquipo);

module.exports = router;