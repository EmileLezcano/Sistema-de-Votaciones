const express = require('express');
const app = express();
const {Pool} = require('pg');
const port = 3000;

app.use(express.json());

//----- Conexión db ----------
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

//----- Rutas CRUD ----------

// Consulta
app.get('/temas', async(req, res) =>{
    try{
        const result = await pool.query('SELECT * FROM crud');
        res.json(result.rows);
    } catch {
        res.status(500).json({message: 'Error al obtener los datos'});
    }
    
});

// Inserción 
app.post('/temas', async(req, res) =>{
    const {tema, url} = req.body
    const result = await pool.query('INSERT INTO crud (tema, url, voto) VALUES ($1, $2, $3) RETURNING *', [tema,url,0]);
    res.json(result.rows[0]);
});

// Actualización
app.put('/temas/:id', async(req, res) =>{
    const id = req.params.id;
    const {tema, url} = req.body;

    const result = await pool.query('UPDATE crud SET tema = $1, url = $2 WHERE id = $3 RETURNING *', [tema, url, id]);
    res.json(result.rows[0]);
});

// Actualización de un parámetro en específico
app.patch('/temas/:id', async(req, res) =>{
    const id = req.params.id;
    const {voto} = req.body;

    const result = await pool.query('UPDATE crud SET voto = voto + $1 WHERE id = $2 RETURNING *', [1, id]);
    res.json(result.rows[0]);
});

// Eliminación
app.delete('/temas/:id', async(req, res) => {
    const id = req.params.id;
    const result = await pool.query('DELETE FROM crud WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
});

// Servidor en escucha
app.listen(port, () =>{
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
});