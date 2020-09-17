const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('DB corriendo correcto');
  } catch (error) {
    console.log('Error: ' + error);
    throw new Error('erro al iniciar db ver log');
  }
};

module.exports = {
  dbConnection,
};
