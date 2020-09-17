// Rutas: /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');

const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es requerido').isEmail(),
    check('password', 'El password es requerido').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
