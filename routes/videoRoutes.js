const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

/**
 * GET /api/videos
 * Obtener todos los videos activos
 */
router.get('/', async (req, res) => {
  try {
    const result = await videoController.getAllVideos();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /videos:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/videos/webinar/:webinarId
 * Obtener todos los videos de un webinar específico
 */
router.get('/webinar/:webinarId', async (req, res) => {
  try {
    const { webinarId } = req.params;

    const result = await videoController.getVideosByWebinar(webinarId);

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /videos/webinar/:webinarId:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/videos/:id
 * Obtener un video por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await videoController.getVideoById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /videos/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
