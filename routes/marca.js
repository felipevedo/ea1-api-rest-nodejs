const express = require('express');
const router = express.Router();
const {
    getMarcas,
    createMarca,
    updateMarca
} = require('../controllers/marca');

router.get('/', getMarcas);
router.post('/', createMarca);
router.put('/', updateMarca);

module.exports = router;