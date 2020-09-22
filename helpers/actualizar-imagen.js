const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  let pathViejo = '';
  switch (tipo) {
    case 'usuarios':
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        return false;
      }
      pathViejo = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo);
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;
    case 'medicos':
      const medico = await Medico.findById(id);
      if (!medico) {
        return false;
      }
      pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);
      medico.img = nombreArchivo;
      await medico.save();
      return true;
    case 'hospitales':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      pathViejo = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejo);
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;
    default:
      return res.status(500).json({
        isSuccess: false,
        message:
          'Debe de indicar una colección: usuarios | medico | hospitales',
      });
  }
};

const borrarImagen = (path) => {
  if (fs.existsSync(path)) {
    // borramos la imagen anterior
    fs.unlinkSync(path);
  }
};

module.exports = { actualizarImagen };
