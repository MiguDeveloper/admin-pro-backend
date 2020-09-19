const { Schema, model } = require('mongoose');

const HospitalSchema = Schema(
  {
    nombre: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'Usuario',
    },
  },
  { collection: 'hospitales' }
);
// usamos el collection para cambiarle el nombre de coleccion y no sea hospitals
module.exports = model('Hospital', HospitalSchema);
