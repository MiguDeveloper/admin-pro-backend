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

//directorio publico
app.use(express.static('public'));

// rutas
app.use('/api/usuarios', require('./ruotes/usuarios-routes'));
app.use('/api/hospitales', require('./ruotes/hospitales-routes'));
app.use('/api/medicos', require('./ruotes/medicos-routes'));
app.use('/api/login', require('./ruotes/auth-routes'));
app.use('/api/todo', require('./ruotes/busquedas-router'));
app.use('/api/upload', require('./ruotes/uploads-router'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
