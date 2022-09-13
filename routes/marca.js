const express = require('express');
const router = express.Router();
const {
    getMarcas,
    createMarca,
    updateMarca,
    deleteMarca
} = require('../controllers/marca');

router.get('/', getMarcas);
router.post('/', createMarca);
router.put('/', updateMarca);
router.delete('/', deleteMarca);

module.exports = router;