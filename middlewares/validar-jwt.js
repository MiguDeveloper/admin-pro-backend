const jwt = require('jsonwebtoken');
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
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: 'Token no valido',
    });
  }
};

module.exports = { validarJwt };
