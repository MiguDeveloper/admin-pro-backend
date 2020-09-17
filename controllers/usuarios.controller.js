const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {
  // ponemos las llaves para especificar un filtro
  const usuarios = await Usuario.find({}, 'nombre email role google');

  res.status(200).json({
    isSuccess: true,
    isWarning: false,
    message: 'Correcto',
    data: usuarios,
  });
};

const createUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email: email });
    if (existeEmail) {
      return res.status(400).json({
        isSuccess: false,
        isWarning: true,
        message: 'El correo ya se encuentra registrado',
      });
    }
    const usuario = new Usuario(req.body);
    // ciframos contrasenia
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
      isSuccess: true,
      isWarning: false,
      message: 'Usario creado con éxito',
      data: usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      isWarning: true,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const updateUsuario = async (req, res) => {
  // TODO: validar token y comprobar si el usuario es correcto
  const uid = req.params.id;

  try {
    const usuarioBd = await Usuario.findById(uid);

    if (!usuarioBd) {
      return res.status(404).json({
        isSuccess: false,
        isWarning: true,
        message: 'Id de usuario no valido, no encontrado',
      });
    }

    // Campos que queremos actualizar
    const { password, google, email, ...campos } = req.body;

    if (usuarioBd.email !== email) {
      const existeEmail = await Usuario.findOne({ email: email });
      if (existeEmail) {
        return res.status(400).json({
          isSuccess: false,
          isWarning: true,
          message: 'El correo que ingreso ya esta registrado',
        });
      }
    }

    // Ej. si queremos borrar algun campo del body que no queremos actualizar
    //delete campos.password;
    //delete campos.google;

    // Ahora agregamos el email ya que es diferente
    campos.email = email;

    // ponemos new: true para que nos retorne el usuario actualizado
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Usuario actualizado con éxito',
      data: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      isWarning: true,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const deleteUsuario = async (req, res) => {
  const uid = req.params.id;
  console.log(uid);
  try {
    const usuarioBd = await Usuario.findById(uid);
    if (!usuarioBd) {
      return res.status(404).json({
        isSuccess: false,
        isWarning: true,
        message: 'Usuario no existe en BD',
      });
    }
    await Usuario.findByIdAndDelete(uid);
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: `Usuario ${uid} eliminado con éxito`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      isSuccess: false,
      isWarning: true,
      message: 'Error inesperado en la base de datos',
    });
  }
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };
