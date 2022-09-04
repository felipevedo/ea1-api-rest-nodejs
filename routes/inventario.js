const express = require('express');
const router = express.Router();
const {
    getInventario,
    createInventario,
    updateInventario
} = require('../controllers/inventario');

router.get('/', getInventario);
router.post('/', createInventario);
router.put('/', updateInventario);

module.exports = router;