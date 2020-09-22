const Hospital = require('../models/hospital');

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find().populate('usuario', 'nombre email');
  try {
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Lista de hospitales correcto',
      data: hospitales,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const crearHospital = async (req, res) => {
  try {
    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });

    const hospitalDb = await hospital.save();
    res.status(201).json({
      isSuccess: true,
      isWarning: false,
      message: 'Hospital creado con éxito',
      data: hospitalDb,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const actualizarHospital = async (req, res) => {
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospitalBd = await Hospital.findById(id);
    if (!hospitalBd) {
      return res.status(404).json({
        isSuccess: false,
        message: 'ID de hospital no encontrado',
      });
    }
    const camposModificar = {
      ...req.body,
      usuario: uid,
    };

    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      camposModificar,
      { new: true }
    );

    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: 'Hospital actualizado con exito',
      data: hospitalActualizado,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

const eliminarHospital = async (req, res) => {
  const id = req.params.id;

  try {
    const hospitalBd = await Hospital.findById(id);
    if (!hospitalBd) {
      return res.status(404).json({
        isSuccess: false,
        message: 'ID de hospital no encontrado',
      });
    }
    await Hospital.findByIdAndDelete(id);
    res.status(200).json({
      isSuccess: true,
      isWarning: false,
      message: `Hospital ${hospitalBd.nombre} eliminado`,
    });
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Error inesperado en la base de datos',
    });
  }
};

module.exports = {
  getHospitales,
  crearHospital,
  actualizarHospital,
  eliminarHospital,
};
