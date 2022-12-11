const express = require('express');
const router = express.Router();
const { authorize } = require('../controllers/auth');
const { check } = require('express-validator');

router.post('/', [
  check('email', 'email.requerido').isEmail(),
  check('contrasena', 'contrasena.requerida').not().isEmpty()
], authorize)

module.exports = router;