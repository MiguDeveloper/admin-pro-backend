const Hospital = require('../models/hospital');
const Medico = require('../models/medico');
const Usuario = require('../models/usuario');

const getTodo = async (req, res) => {
  try {
    const busqueda = req.params.busqueda || '';
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
    ]);

    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Búsqueda correcta',
      data: { usuarios: usuarios, medicos: medicos, hospitales: hospitales },
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Hubo un error en la base de datos',
    });
  }
};

const getDocumentoColeccion = async (req, res) => {
  try {
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    let data = [];

    switch (tabla) {
      case 'medicos':
        data = await Medico.find({ nombre: regex })
          .populate('usuario', 'nombre img')
          .populate('hospital', 'nombre img');
        break;
      case 'hospitales':
        data = await Hospital.find({ nombre: regex }).populate(
          'usuario',
          'nombre img'
        );
        break;
      case 'usuarios':
        data = await Usuario.find({ nombre: regex });
        break;
      default:
        return res.status(400).json({
          isSuccess: false,
          message: 'Debe indicar la tabla medicos | hospitales | usuarios',
        });
        break;
    }

    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: `Consulta éxitosa: ${tabla}`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Hubo un error en la base de datos',
    });
  }
};

module.exports = { getTodo, getDocumentoColeccion };
