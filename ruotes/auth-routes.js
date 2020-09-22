// Rutas: /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const {
  login,
  googleSingIn,
  renewToken,
} = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJwt } = require('../middlewares/validar-jwt');

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

router.post(
  '/google',
  [check('token', 'El token de google es obligatorio'), validarCampos],
  googleSingIn
);

router.get('/renew', validarJwt, renewToken);

module.exports = router;
