const express = require('express');
const router = express.Router();
const webinarController = require('../controllers/webinarController');

/**
 * GET /api/webinars
 * Obtener todos los webinars activos
 */
router.get('/', async (req, res) => {
  try {
    const result = await webinarController.getAllWebinars();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /webinars:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/webinars/search?q=termino
 * Buscar webinars por título o descripción
 */
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'El parámetro de búsqueda "q" es requerido'
      });
    }

    const result = await webinarController.searchWebinars(q);

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /webinars/search:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/webinars/category/:categoryId
 * Obtener webinars por categoría
 */
router.get('/category/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    const result = await webinarController.getWebinarsByCategory(categoryId);

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /webinars/category/:categoryId:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/webinars/:id
 * Obtener un webinar por ID con sus videos
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await webinarController.getWebinarById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /webinars/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
