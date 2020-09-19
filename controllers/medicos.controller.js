const Medico = require('../models/medico');

const getMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre email')
    .populate('hospital', 'nombre');
  try {
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Lista medicos',
      data: medicos,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const crearMedico = async (req, res) => {
  try {
    const uid = req.uid;
    const medico = new Medico({
      usuario: uid,
      ...req.body,
    });

    const medicoBd = await medico.save();
    res.status(201).json({
      isSuccess: true,
      isWarning: false,
      message: 'Medico creado con éxito',
      data: medicoBd,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const actualizarMedico = async (req, res) => {
  try {
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Médico actualizado con éxito',
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const eliminarMedico = async (req, res) => {
  try {
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Médico eliminado',
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

module.exports = { getMedicos, crearMedico, actualizarMedico, eliminarMedico };
