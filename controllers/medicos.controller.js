const Medico = require('../models/medico');

const getMedicos = async (req, res) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre')
    .populate('hospital', 'nombre img');
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
  const id = req.params.id;
  const uid = req.uid;
  try {
    const medicoBd = await Medico.findById(id);
    if (!medicoBd) {
      return res.status(404).json({
        isSuccess: false,
        message: 'ID de medico no encontrado',
      });
    }

    const camposActualizar = {
      usuario: uid,
      ...req.body,
    };

    const medicoActualizado = await Medico.findByIdAndUpdate(
      id,
      camposActualizar,
      { new: true }
    );

    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Médico actualizado con éxito',
      data: medicoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const eliminarMedico = async (req, res) => {
  const id = req.params.id;

  try {
    const medicoBd = await Medico.findById(id);
    if (!medicoBd) {
      return res.status(404).json({
        isSuccess: false,
        message: 'ID de medico no encontrado',
      });
    }

    await Medico.findByIdAndDelete(id);

    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: `Médico ${medicoBd.nombre} fue eliminado`,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const getMedicoById = async (req, res) => {
  const id = req.params.id;
  try {
    const medico = await Medico.findById(id)
      .populate('usuario', 'nombre img')
      .populate('hospital', 'nombre img');
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Medico encontrado ok',
      data: medico,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

module.exports = {
  getMedicos,
  crearMedico,
  actualizarMedico,
  eliminarMedico,
  getMedicoById,
};
