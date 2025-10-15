const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

/**
 * GET /api/categories
 * Obtener todas las categorías
 */
router.get('/', async (req, res) => {
  try {
    const result = await categoryController.getAllCategories();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /categories:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/categories/:id
 * Obtener una categoría por ID con sus webinars
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await categoryController.getCategoryById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /categories/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
