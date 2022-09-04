const express = require('express');
const router = express.Router();
const { 
    getTipos,
    createTipoEquipo,
    updateTipoEquipo,
    getEstados,
    createEstadoEquipo,
    updateEstadoEquipo
 } = require('../controllers/equipo');

router.get('/tipos', getTipos);
router.post('/tipos', createTipoEquipo);
router.put('/tipos', updateTipoEquipo);
router.get('/estados', getEstados);
router.post('/estados', createEstadoEquipo);
router.put('/estados', updateEstadoEquipo);

module.exports = router;