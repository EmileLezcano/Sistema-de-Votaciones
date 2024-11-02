const express = require('express');
const app = express();
const { Pool } = require('pg');
const port = 3000;

app.use(express.json());

// Conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'crud_db',
    password: '123',
    port: 5432,
});

// Obtener todos los temas
app.get('/temas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM crud');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos' });
    }
});

// Inserción de nuevo tema
app.post('/temas', async (req, res) => {
    const { tema, url } = req.body;

    if (!tema || !url) {
        return res.status(400).json({ message: 'El tema y link son obligatorios' });
    }

    try {
        const comparar_tema = await pool.query('SELECT 1 FROM crud WHERE tema = $1', [tema]);

        if (comparar_tema.rows.length > 0) {
            return res.status(400).json({ message: 'El tema ya existe' });
        }

        const result = await pool.query('INSERT INTO crud (tema, url, voto) VALUES ($1, $2, $3) RETURNING *', [tema, url, 0]);
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al insertar el tema' });
    }
});

// Actualización de tema
app.put('/temas/:id', async (req, res) => {
    const id = req.params.id;
    const { tema, url } = req.body;

    if (!tema || !url) {
        return res.status(400).json({ message: 'El tema y link son obligatorios' });
    }

    try {
        const result = await pool.query('UPDATE crud SET tema = $1, url = $2 WHERE id = $3 RETURNING *', [tema, url, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tema no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el tema' });
    }
});

// Incrementar votos
app.patch('/temas/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('UPDATE crud SET voto = voto + 1 WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tema no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el voto' });
    }
});

// Eliminación de tema
app.delete('/temas/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query('DELETE FROM crud WHERE id = $1 RETURNING *', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Tema no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el tema' });
    }
});

// Servidor en escucha
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
