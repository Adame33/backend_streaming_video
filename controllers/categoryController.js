const prisma = require('../prisma/client');

/**
 * Obtener todas las categorías
 */
const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { webinars: true }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    return {
      success: true,
      data: categories
    };
  } catch (error) {
    console.error('Error en getAllCategories:', error);
    return { success: false, message: 'Error al obtener las categorías', error: error.message };
  }
};

/**
 * Obtener una categoría por ID
 */
const getCategoryById = async (categoryId) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) },
      include: {
        webinars: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            description: true,
            thumbnailUrl: true,
            createdAt: true,
            _count: {
              select: { videos: true }
            }
          }
        }
      }
    });

    if (!category) {
      return { success: false, message: 'Categoría no encontrada' };
    }

    return {
      success: true,
      data: category
    };
  } catch (error) {
    console.error('Error en getCategoryById:', error);
    return { success: false, message: 'Error al obtener la categoría', error: error.message };
  }
};

module.exports = {
  getAllCategories,
  getCategoryById
};
