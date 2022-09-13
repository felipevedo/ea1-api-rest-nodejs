const express = require('express');
const router = express.Router();
const {
    getInventario,
    createInventario,
    updateInventario,
    deleteInventario
} = require('../controllers/inventario');

router.get('/', getInventario);
router.post('/', createInventario);
router.put('/', updateInventario);
router.delete('/', deleteInventario);

module.exports = router;