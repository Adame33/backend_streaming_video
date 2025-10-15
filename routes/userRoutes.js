const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/**
 * POST /api/users/register
 * Registrar un nuevo usuario
 */
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, firstName, lastName } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username y password son requeridos'
      });
    }

    const result = await userController.register(
      username,
      password,
      email,
      firstName,
      lastName
    );

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error('Error en POST /register:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * POST /api/users/login
 * Login de usuario
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validar campos requeridos
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username y password son requeridos'
      });
    }

    const result = await userController.login(username, password);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en POST /login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/users/:id
 * Obtener un usuario por ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userController.getUserById(id);

    if (!result.success) {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /users/:id:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

/**
 * GET /api/users
 * Obtener todos los usuarios activos
 */
router.get('/', async (req, res) => {
  try {
    const result = await userController.getAllUsers();

    if (!result.success) {
      return res.status(500).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error en GET /users:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
