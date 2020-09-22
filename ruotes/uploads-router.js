const { Router } = require('express');
const {
  updateFile,
  retornaImagen,
} = require('../controllers/uploads.controller');
const { validarJwt } = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload');

const router = Router();
router.use(fileUpload());

router.put('/:tipo/:id', [validarJwt], updateFile);
router.get('/:tipo/:foto', [validarJwt], retornaImagen);
module.exports = router;
