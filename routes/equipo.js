const express = require('express');
const router = express.Router();
const { 
    getTipos,
    createTipoEquipo,
    updateTipoEquipo,
    deleteTipoEquipo,
    getEstados,
    createEstadoEquipo,
    updateEstadoEquipo,
    deleteEstadoEquipo
 } = require('../controllers/equipo');

router.get('/tipos', getTipos);
router.post('/tipos', createTipoEquipo);
router.put('/tipos', updateTipoEquipo);
router.delete('/tipos', deleteTipoEquipo);
router.get('/estados', getEstados);
router.post('/estados', createEstadoEquipo);
router.put('/estados', updateEstadoEquipo);
router.delete('/estados', deleteEstadoEquipo);

module.exports = router;