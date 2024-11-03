// models/temasModel.js
module.exports = {
    obtenerTemas: async (pool) => {
        const result = await pool.query('SELECT * FROM crud ORDER BY voto DESC');
        return result.rows;
    },

    crearTema: async (pool, tema, url) => {
        const temaExistente = await pool.query('SELECT 1 FROM crud WHERE tema = $1', [tema]);
        if (temaExistente.rows.length > 0) throw new Error('El tema ya existe');
        const result = await pool.query('INSERT INTO crud (tema, url, voto) VALUES ($1, $2, $3) RETURNING *', [tema, url, 0]);
        return result.rows[0];
    },

    actualizarTema: async (pool, id, tema, url) => {
        const result = await pool.query('UPDATE crud SET tema = $1, url = $2 WHERE id = $3 RETURNING *', [tema, url, id]);
        if (result.rows.length === 0) throw new Error('Tema no encontrado');
        return result.rows[0];
    },

    eliminarTema: async (pool, id) => {
        const result = await pool.query('DELETE FROM crud WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) throw new Error('Tema no encontrado');
        return result.rows[0];
    },

    votarTema: async (pool, id) => {
        const result = await pool.query('UPDATE crud SET voto = voto + 1 WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) throw new Error('Tema no encontrado');
        return result.rows[0];
    }
};
