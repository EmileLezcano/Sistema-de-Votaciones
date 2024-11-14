// app.js
const express = require('express');
const app = express();
const temasController = require('./controllers/temasController');
const { Pool } = require('pg');
const path = require('path');
const port = 3000;

// Configuración de la base de datos
const pool = new Pool({
    user: 'nombre_de_usuario',
    host: 'localhost',
    database: 'nombre_base_de_datos',
    password: 'contraseña',
    port: 'puerto_database', // puerto predeterminado de postgres
});

// Configuración de EJS y archivos estáticos
app.set('view engine', 'ejs'); //  Configura EJS como motor de plantillas para renderizar las vistas HTML.
app.set('views', path.join(__dirname, 'views')); //  Define la carpeta donde están las vistas (views).
app.use(express.static(path.join(__dirname, 'public'))); // Sirve archivos estáticos (CSS, imágenes, JavaScript) desde la carpeta public.
app.use(express.json()); // Habilita el middleware express.json para procesar solicitudes JSON, útil para leer req.body.

// Pasar la conexión pool a cada controlador
app.use((req, res, next) => { // Este middleware agrega la conexión pool a cada solicitud (req.pool), lo que permite a los controladores acceder a la base de datos sin necesidad de crear una nueva conexión.
    req.pool = pool;
    next(); // Llama a next() para continuar con la siguiente función en la cadena de middlewares o controladores.
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
