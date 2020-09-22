const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');

const updateFile = async (req, res) => {
  try {
    const tipo = req.params.tipo;
    const id = req.params.id;

    //validar tipo
    const tiposValidos = ['usuarios', 'medicos', 'hospitales'];
    if (!tiposValidos.includes(tipo)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'No es un medico | usuario | hospital',
      });
    }

    // nos aseguramos que venga un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
      return res
        .status(400)
        .json({ isSuccess: false, message: 'Falta archivo por cargar' });
    }

    // validamos extension
    const file = req.files.imagen;
    const splitNombre = file.name.split('.');
    const extensionArchivo = splitNombre[splitNombre.length - 1];

    const extensionesValidas = ['jpg', 'jpeg', 'gif', 'png'];
    if (!extensionesValidas.includes(extensionArchivo)) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Tipo de archivo no permitido',
      });
    }

    // generamos el id del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path para guardar imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {
      if (err) {
        return res.status(500).json({
          isSuccess: false,
          message: 'Error al mover la imagen',
        });
      }

      // actualizamos la imagen
      if (!actualizarImagen(tipo, id, nombreArchivo)) {
        res.status(400).json({
          isSuccess: false,
          message: 'Usuario no encontrado',
          data: id,
        });
      }

      res.status(200).json({
        isSuccess: true,
        message: 'Arhivo subido con éxito',
        data: { archivo: nombreArchivo },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Hubo un error en la base de datos',
    });
  }
};

const retornaImagen = (req, res) => {
  const tipo = req.params.tipo;
  const foto = req.params.foto;
  // Se necesita toda la ubicacion
  let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
  // si la imagen no existe
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    pathImg = path.join(__dirname, '../uploads/no-img.jpg');
    res.sendFile(pathImg);
  }
};
module.exports = { updateFile, retornaImagen };
