// controllers/temasController.js
const temasModel = require('../models/temasModel');

module.exports = {
    obtenerTemas: async (req, res) => {
        try {
            const temas = await temasModel.obtenerTemas(req.pool);
            res.render('temas', { temas });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    crearTema: async (req, res) => {
        const { tema, url } = req.body;
        try {
            const nuevoTema = await temasModel.crearTema(req.pool, tema, url);
            res.status(201).json(nuevoTema);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    actualizarTema: async (req, res) => {
        const { id } = req.params;
        const { tema, url } = req.body;
        try {
            const temaActualizado = await temasModel.actualizarTema(req.pool, id, tema, url);
            res.json(temaActualizado);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    eliminarTema: async (req, res) => {
        const { id } = req.params;
        try {
            const temaEliminado = await temasModel.eliminarTema(req.pool, id);
            res.json({ message: 'Tema eliminado', tema: temaEliminado });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    votarTema: async (req, res) => {
        const { id } = req.params;
        try {
            const temaVotado = await temasModel.votarTema(req.pool, id);
            res.json(temaVotado);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
};
