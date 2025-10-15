const prisma = require('../prisma/client');

/**
 * Registrar un nuevo usuario
 */
const register = async (username, password, email, firstName, lastName) => {
  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return { success: false, message: 'El nombre de usuario ya existe' };
    }

    // Verificar si el email ya existe (si se proporciona)
    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email }
      });

      if (existingEmail) {
        return { success: false, message: 'El email ya está registrado' };
      }
    }

    // Crear el usuario (NOTA: En producción, debes hashear la contraseña con bcrypt)
    const user = await prisma.user.create({
      data: {
        username,
        password, // TODO: Hashear con bcrypt
        email,
        firstName,
        lastName
      }
    });

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Usuario creado exitosamente',
      data: userWithoutPassword
    };
  } catch (error) {
    console.error('Error en register:', error);
    return { success: false, message: 'Error al crear el usuario', error: error.message };
  }
};

/**
 * Login de usuario
 */
const login = async (username, password) => {
  try {
    // Buscar el usuario
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      return { success: false, message: 'Usuario inactivo' };
    }

    // Verificar la contraseña (NOTA: En producción, usar bcrypt.compare)
    if (user.password !== password) {
      return { success: false, message: 'Usuario o contraseña incorrectos' };
    }

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: 'Login exitoso',
      data: userWithoutPassword
    };
  } catch (error) {
    console.error('Error en login:', error);
    return { success: false, message: 'Error al iniciar sesión', error: error.message };
  }
};

/**
 * Obtener un usuario por ID
 */
const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    });

    if (!user) {
      return { success: false, message: 'Usuario no encontrado' };
    }

    // No devolver la contraseña
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      data: userWithoutPassword
    };
  } catch (error) {
    console.error('Error en getUserById:', error);
    return { success: false, message: 'Error al obtener el usuario', error: error.message };
  }
};

/**
 * Listar todos los usuarios activos
 */
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return {
      success: true,
      data: users
    };
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    return { success: false, message: 'Error al obtener los usuarios', error: error.message };
  }
};

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers
};
