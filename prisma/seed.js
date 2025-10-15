const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Comenzando a insertar datos de prueba...\n');

  try {
    // 1. Crear Usuarios
    console.log('👥 Creando usuarios...');
    const users = await Promise.all([
      prisma.user.create({
        data: {
          username: 'admin',
          password: 'admin123', // TODO: En producción, hashear con bcrypt
          email: 'admin@ejemplo.com',
          firstName: 'Admin',
          lastName: 'Sistema',
          isActive: true
        }
      }),
      prisma.user.create({
        data: {
          username: 'juan_perez',
          password: 'juan123',
          email: 'juan.perez@ejemplo.com',
          firstName: 'Juan',
          lastName: 'Pérez',
          isActive: true
        }
      }),
      prisma.user.create({
        data: {
          username: 'maria_lopez',
          password: 'maria123',
          email: 'maria.lopez@ejemplo.com',
          firstName: 'María',
          lastName: 'López',
          isActive: true
        }
      }),
      prisma.user.create({
        data: {
          username: 'carlos_garcia',
          password: 'carlos123',
          email: 'carlos.garcia@ejemplo.com',
          firstName: 'Carlos',
          lastName: 'García',
          isActive: true
        }
      }),
      prisma.user.create({
        data: {
          username: 'ana_martinez',
          password: 'ana123',
          email: 'ana.martinez@ejemplo.com',
          firstName: 'Ana',
          lastName: 'Martínez',
          isActive: true
        }
      }),
      prisma.user.create({
        data: {
          username: 'pedro_sanchez',
          password: 'pedro123',
          email: 'pedro.sanchez@ejemplo.com',
          firstName: 'Pedro',
          lastName: 'Sánchez',
          isActive: false // Usuario inactivo
        }
      })
    ]);
    console.log(`✅ ${users.length} usuarios creados\n`);

    // 2. Crear Categorías
    console.log('📂 Creando categorías...');
    const categoryProgramacion = await prisma.category.create({
      data: {
        name: 'Programación',
        description: 'Cursos y tutoriales de desarrollo de software, lenguajes de programación y frameworks modernos'
      }
    });

    const categoryMarketing = await prisma.category.create({
      data: {
        name: 'Marketing Digital',
        description: 'Estrategias de marketing online, redes sociales, SEO y publicidad digital'
      }
    });

    const categoryDiseno = await prisma.category.create({
      data: {
        name: 'Diseño Gráfico',
        description: 'Diseño visual, ilustración, branding y herramientas de diseño profesional'
      }
    });
    console.log(`✅ 3 categorías creadas\n`);

    // 3. Crear Webinars
    console.log('🎓 Creando webinars...');
    
    // Webinar de Programación
    const webinarNodeJS = await prisma.webinar.create({
      data: {
        title: 'Introducción a Node.js y Express',
        description: 'Aprende a crear aplicaciones backend modernas con Node.js y Express. En este webinar cubriremos desde los fundamentos hasta la creación de APIs RESTful completas.',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        categoryId: categoryProgramacion.id,
        isActive: true
      }
    });

    // Webinar de Marketing
    const webinarMarketing = await prisma.webinar.create({
      data: {
        title: 'Estrategias de Marketing en Redes Sociales',
        description: 'Domina las estrategias más efectivas para promocionar tu marca en redes sociales. Aprende a crear contenido viral y aumentar tu engagement.',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        categoryId: categoryMarketing.id,
        isActive: true
      }
    });

    // Webinar de Diseño
    const webinarDiseno = await prisma.webinar.create({
      data: {
        title: 'Fundamentos de Diseño UX/UI',
        description: 'Descubre los principios esenciales del diseño de experiencia de usuario y diseño de interfaces. Aprende a crear productos digitales intuitivos y atractivos.',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        categoryId: categoryDiseno.id,
        isActive: true
      }
    });
    console.log(`✅ 3 webinars creados\n`);

    // 4. Crear Videos
    console.log('🎥 Creando videos...');
    
    // Videos para Webinar de Node.js
    const videoNodeJS1 = await prisma.video.create({
      data: {
        title: 'Instalación y Configuración de Node.js',
        description: 'En este video aprenderás cómo instalar Node.js en tu sistema operativo y configurar tu entorno de desarrollo.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 720, // 12 minutos
        order: 1,
        webinarId: webinarNodeJS.id,
        isActive: true
      }
    });

    const videoNodeJS2 = await prisma.video.create({
      data: {
        title: 'Tu Primer Servidor con Express',
        description: 'Crea tu primer servidor web utilizando Express.js. Aprende los conceptos básicos de routing y middleware.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 900, // 15 minutos
        order: 2,
        webinarId: webinarNodeJS.id,
        isActive: true
      }
    });

    const videoNodeJS3 = await prisma.video.create({
      data: {
        title: 'Creando una API RESTful',
        description: 'Construye una API REST completa con operaciones CRUD. Aprende las mejores prácticas para diseñar APIs escalables.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 1200, // 20 minutos
        order: 3,
        webinarId: webinarNodeJS.id,
        isActive: true
      }
    });

    // Videos para Webinar de Marketing
    const videoMarketing1 = await prisma.video.create({
      data: {
        title: 'Introducción al Marketing Digital',
        description: 'Descubre los fundamentos del marketing digital y cómo aplicarlos en tu negocio.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 600, // 10 minutos
        order: 1,
        webinarId: webinarMarketing.id,
        isActive: true
      }
    });

    const videoMarketing2 = await prisma.video.create({
      data: {
        title: 'Estrategias de Contenido Viral',
        description: 'Aprende las técnicas para crear contenido que conecte con tu audiencia y se vuelva viral.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 840, // 14 minutos
        order: 2,
        webinarId: webinarMarketing.id,
        isActive: true
      }
    });

    // Videos para Webinar de Diseño
    const videoDiseno1 = await prisma.video.create({
      data: {
        title: 'Principios de Diseño UX',
        description: 'Conoce los principios fundamentales del diseño de experiencia de usuario y cómo aplicarlos.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 780, // 13 minutos
        order: 1,
        webinarId: webinarDiseno.id,
        isActive: true
      }
    });

    const videoDiseno2 = await prisma.video.create({
      data: {
        title: 'Diseño de Interfaces Modernas',
        description: 'Crea interfaces atractivas y funcionales siguiendo las últimas tendencias de diseño.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 960, // 16 minutos
        order: 2,
        webinarId: webinarDiseno.id,
        isActive: true
      }
    });

    const videoDiseno3 = await prisma.video.create({
      data: {
        title: 'Herramientas de Diseño: Figma y Adobe XD',
        description: 'Domina las herramientas profesionales más populares para diseño de interfaces.',
        videoUrl: 'https://www.youtube.com/watch?v=iDVYi0zZty4',
        thumbnailUrl: 'https://imgs.search.brave.com/oY15YbW6z18oKUrSthmxhMrjRSAoEhr36TN0oGlDjaE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tYXJr/ZXRwbGFjZS5jYW52/YS5jb20vRUFGandy/dXNFMFkvMi8wLzE2/MDB3L2NhbnZhLW1p/bmlhdHVyYS1kZS15/b3V0dWJlLXJvam8t/YW1hcmlsbG8tY3Jl/bWEtcGVuc2Fkby1w/YXJhLXYlQzMlQURk/ZW8tY29taWRhLXln/aEtjcXl5N1BNLmpw/Zw',
        duration: 1080, // 18 minutos
        order: 3,
        webinarId: webinarDiseno.id,
        isActive: true
      }
    });

    console.log(`✅ 9 videos creados (3 por webinar)\n`);

    // Resumen final
    console.log('📊 ===== RESUMEN DE DATOS INSERTADOS =====');
    console.log(`👥 Usuarios: ${users.length}`);
    console.log(`📂 Categorías: 3`);
    console.log(`🎓 Webinars: 3`);
    console.log(`🎥 Videos: 9`);
    console.log('\n✨ ¡Datos de prueba insertados exitosamente!\n');

    console.log('🔐 Credenciales de usuarios creados:');
    console.log('-----------------------------------');
    console.log('Usuario: admin | Password: admin123');
    console.log('Usuario: juan_perez | Password: juan123');
    console.log('Usuario: maria_lopez | Password: maria123');
    console.log('Usuario: carlos_garcia | Password: carlos123');
    console.log('Usuario: ana_martinez | Password: ana123');
    console.log('Usuario: pedro_sanchez | Password: pedro123 (INACTIVO)');
    console.log('-----------------------------------\n');

  } catch (error) {
    console.error('❌ Error al insertar datos:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error fatal:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🔌 Desconectado de la base de datos');
  });
