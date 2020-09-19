const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor de express
const app = express();

// configuramos cors
app.use(cors());

// lectura y parseo del body
app.use(express.json());

// base de datos
dbConnection();

// rutas
app.use('/api/usuarios', require('./ruotes/usuarios-routes'));
app.use('/api/hospitales', require('./ruotes/hospitales-routes'));
app.use('/api/medicos', require('./ruotes/medicos-routes'));
app.use('/api/login', require('./ruotes/auth-routes'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
