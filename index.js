// importamos express
const express = require('express');
const { dbConnection } = require('./db/config');
const cors = require('cors')
require('dotenv').config();

// creacmos el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Publico
app.use( express.static('public') )

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'))

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`)
})
