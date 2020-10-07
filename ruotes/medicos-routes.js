// Rutas: /api/medicos
const { Router } = require('express');
const { check } = require('express-validator');
const {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
  getMedicoById,
} = require('../controllers/medicos.controller');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', [validarJwt], getMedicos);
router.post(
  '/',
  [
    validarJwt,
    check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
    check('hospital', 'Debe seleccionar un hospital').not().isEmpty(),
    check('hospital', 'ID hospital no es valido').isMongoId(),
    validarCampos,
  ],
  crearMedico
);
router.put('/:id', [validarJwt], actualizarMedico);
router.delete('/:id', [validarJwt], eliminarMedico);
router.get('/:id', [validarJwt], getMedicoById);

module.exports = router;
