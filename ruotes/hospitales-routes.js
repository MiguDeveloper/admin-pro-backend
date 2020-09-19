// Rutal: /api/hospitales

const { Router } = require('express');
const { check } = require('express-validator');
const {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
} = require('../controllers/hospitales.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();
router.get('/', [validarJwt], getHospitales);
router.post(
  '/',
  [
    validarJwt,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos,
  ],
  crearHospital
);
router.put('/:id', [validarJwt], actualizarHospital);
router.delete('/:id', [validarJwt], eliminarHospital);

module.exports = router;
