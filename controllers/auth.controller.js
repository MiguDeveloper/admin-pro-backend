const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuarioDb = await Usuario.findOne({ email: email });
    if (!usuarioDb) {
      return res.status(404).json({
        isSuccess: false,
        isWarning: true,
        message: 'Credenciales no validas',
      });
    }

    // verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDb.password);
    if (!validPassword) {
      return res.status(400).json({
        isSuccess: false,
        isWarning: true,
        message: 'Contraseña no valida',
      });
    }

    // generar el token
    const token = await generarJWT(usuarioDb._id, email);
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Acceso correcto',
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      isSuccess: false,
      isWarning: true,
      message: 'Error inespera en la base de datos',
    });
  }
};

const googleSingIn = async (req, res) => {
  try {
    const googleToken = req.body.token;

    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDb = await Usuario.findOne({ email });
    let usuario;

    // si no existe el usuario
    if (!usuarioDb) {
      usuario = new Usuario({
        nombre: name,
        email,
        password: '@@@',
        img: picture,
        google: true,
      });
    } else {
      //existe el usuario
      usuario = usuarioDb;
      usuario.google = true;
    }

    //guardamos en la bd
    await usuario.save();

    // generar token
    const token = await generarJWT(usuario.id, email);

    res.status(200).json({
      isSuccess: true,
      message: 'Login exitoso',
      data: token,
    });
  } catch (error) {
    res.status(401).json({
      isSuccess: false,
      message: 'token no es correcto',
    });
  }
};

module.exports = { login, googleSingIn };
