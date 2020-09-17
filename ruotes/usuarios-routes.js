// Rutas: /api/usuarios
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} = require('../controllers/usuarios.controller');

const router = Router();

router.get('/', getUsuarios);
router.delete('/:id', deleteUsuario);
router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es requerido').not().isEmpty(),
    check('email', 'Formato de correo no es valido').isEmail(),
    validarCampos,
  ],
  createUsuario
);
router.put(
  '/:id',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'Formato de correo no es valido').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
    validarCampos,
  ],
  updateUsuario
);

module.exports = router;
