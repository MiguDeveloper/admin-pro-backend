const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor de express
const app = express();

// configuramos cors
app.use(cors());

// base de datos
dbConnection();

// mostramos las variables de entorno de node
console.log(process.env);

app.get('/', (req, res) => {
  res.status(200).json({
    isSuccess: true,
    isWarning: false,
    message: 'Correcto',
  });
});

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
