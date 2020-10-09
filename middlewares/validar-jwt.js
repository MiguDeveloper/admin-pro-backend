const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJwt = (req, res, next) => {
  // leer token
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      isSuccess: false,
      message: 'No tiene token de verificación',
    });
  }

  try {
    const { uid, email } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    req.email = email;
    next();
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: 'Token no valido',
    });
  }
};

const validarAdminRole = async (req, res, next) => {
  const uid = req.uid;
  try {
    const usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Usuario no encontrado',
      });
    }

    if (usuarioDb.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        isSuccess: false,
        message: 'Tu usuario no autorizado',
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Hubo un error al validar role',
    });
  }
};

const validarAdminRoleMismoUsuario = async (req, res, next) => {
  const uid = req.uid;
  const uidActualizar = req.params.id;
  try {
    const usuarioDb = await Usuario.findById(uid);
    if (!usuarioDb) {
      return res.status(404).json({
        isSuccess: false,
        message: 'Usuario no encontrado',
      });
    }

    if (usuarioDb.role === 'ADMIN_ROLE' || uid === uidActualizar) {
      next();
    } else {
      return res.status(403).json({
        isSuccess: false,
        message: 'Tu usuario no autorizado',
      });
    }
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Hubo un error al validar role',
    });
  }
};

module.exports = { validarJwt, validarAdminRole, validarAdminRoleMismoUsuario };
