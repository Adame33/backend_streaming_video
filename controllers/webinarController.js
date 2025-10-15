const prisma = require('../prisma/client');

/**
 * Obtener todos los webinars activos
 */
const getAllWebinars = async () => {
  try {
    const webinars = await prisma.webinar.findMany({
      where: { isActive: true },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: { videos: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: webinars
    };
  } catch (error) {
    console.error('Error en getAllWebinars:', error);
    return { success: false, message: 'Error al obtener los webinars', error: error.message };
  }
};

/**
 * Obtener un webinar por ID con sus videos
 */
const getWebinarById = async (webinarId) => {
  try {
    const webinar = await prisma.webinar.findUnique({
      where: { id: parseInt(webinarId) },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            description: true
          }
        },
        videos: {
          where: { isActive: true },
          orderBy: {
            order: 'asc'
          }
        }
      }
    });

    if (!webinar) {
      return { success: false, message: 'Webinar no encontrado' };
    }

    return {
      success: true,
      data: webinar
    };
  } catch (error) {
    console.error('Error en getWebinarById:', error);
    return { success: false, message: 'Error al obtener el webinar', error: error.message };
  }
};

/**
 * Obtener webinars por categoría
 */
const getWebinarsByCategory = async (categoryId) => {
  try {
    const webinars = await prisma.webinar.findMany({
      where: {
        categoryId: parseInt(categoryId),
        isActive: true
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: { videos: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: webinars
    };
  } catch (error) {
    console.error('Error en getWebinarsByCategory:', error);
    return { success: false, message: 'Error al obtener los webinars por categoría', error: error.message };
  }
};

/**
 * Buscar webinars por título
 */
const searchWebinars = async (searchTerm) => {
  try {
    const webinars = await prisma.webinar.findMany({
      where: {
        isActive: true,
        OR: [
          {
            title: {
              contains: searchTerm
            }
          },
          {
            description: {
              contains: searchTerm
            }
          }
        ]
      },
      include: {
        category: {
          select: {
            id: true,
            name: true
          }
        },
        _count: {
          select: { videos: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: webinars
    };
  } catch (error) {
    console.error('Error en searchWebinars:', error);
    return { success: false, message: 'Error al buscar webinars', error: error.message };
  }
};

module.exports = {
  getAllWebinars,
  getWebinarById,
  getWebinarsByCategory,
  searchWebinars
};
