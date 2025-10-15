const prisma = require('../prisma/client');

/**
 * Obtener un video por ID
 */
const getVideoById = async (videoId) => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: parseInt(videoId) },
      include: {
        webinar: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnailUrl: true,
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!video) {
      return { success: false, message: 'Video no encontrado' };
    }

    if (!video.isActive) {
      return { success: false, message: 'Video no disponible' };
    }

    return {
      success: true,
      data: video
    };
  } catch (error) {
    console.error('Error en getVideoById:', error);
    return { success: false, message: 'Error al obtener el video', error: error.message };
  }
};

/**
 * Obtener todos los videos de un webinar
 */
const getVideosByWebinar = async (webinarId) => {
  try {
    const videos = await prisma.video.findMany({
      where: {
        webinarId: parseInt(webinarId),
        isActive: true
      },
      orderBy: {
        order: 'asc'
      }
    });

    return {
      success: true,
      data: videos
    };
  } catch (error) {
    console.error('Error en getVideosByWebinar:', error);
    return { success: false, message: 'Error al obtener los videos del webinar', error: error.message };
  }
};

/**
 * Obtener todos los videos activos
 */
const getAllVideos = async () => {
  try {
    const videos = await prisma.video.findMany({
      where: { isActive: true },
      include: {
        webinar: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
      orderBy: [
        {
          webinarId: 'asc'
        },
        {
          order: 'asc'
        }
      ]
    });

    return {
      success: true,
      data: videos
    };
  } catch (error) {
    console.error('Error en getAllVideos:', error);
    return { success: false, message: 'Error al obtener los videos', error: error.message };
  }
};

module.exports = {
  getVideoById,
  getVideosByWebinar,
  getAllVideos
};
