// app.js
const express = require('express');
const app = express();
const temasController = require('./controllers/temasController');
const { Pool } = require('pg');
const path = require('path');
const port = 3000;

// Configuración de la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_db',
    password: '123',
    port: 5432,
});

// Configuración de EJS y archivos estáticos
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Pasar la conexión pool a cada controlador
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Rutas
app.get('/', temasController.obtenerTemas);
app.post('/temas', temasController.crearTema);
app.put('/temas/:id', temasController.actualizarTema);
app.delete('/temas/:id', temasController.eliminarTema);
app.patch('/temas/:id/votar', temasController.votarTema);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
