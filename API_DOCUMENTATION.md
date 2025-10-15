# 📚 API Documentation - Backend Streaming Video

## 🌐 Base URL
```
http://localhost:3000/api
```

---

## 📋 Tabla de Contenidos
- [Autenticación](#autenticación)
  - [Registrar Usuario](#registrar-usuario)
  - [Login](#login)
  - [Obtener Usuario por ID](#obtener-usuario-por-id)
  - [Listar Usuarios](#listar-usuarios)
- [Categorías](#categorías)
  - [Listar Categorías](#listar-categorías)
  - [Obtener Categoría por ID](#obtener-categoría-por-id)
- [Webinars](#webinars)
  - [Listar Webinars](#listar-webinars)
  - [Obtener Webinar por ID](#obtener-webinar-por-id)
  - [Buscar Webinars](#buscar-webinars)
  - [Webinars por Categoría](#webinars-por-categoría)
- [Videos](#videos)
  - [Listar Videos](#listar-videos)
  - [Obtener Video por ID](#obtener-video-por-id)
  - [Videos por Webinar](#videos-por-webinar)

---

## 🔐 Autenticación

### Registrar Usuario
Crea un nuevo usuario en el sistema.

**Endpoint:** `POST /api/users/register`

**Body (JSON):**
```json
{
  "username": "usuario123",
  "password": "miPassword123",
  "email": "usuario@ejemplo.com",
  "firstName": "Juan",
  "lastName": "Pérez"
}
```

**Ejemplo con Fetch:**
```javascript
async function registerUser() {
  try {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'usuario123',
        password: 'miPassword123',
        email: 'usuario@ejemplo.com',
        firstName: 'Juan',
        lastName: 'Pérez'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Usuario registrado:', data.data);
      // Guardar información del usuario
      localStorage.setItem('user', JSON.stringify(data.data));
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error en el registro:', error);
  }
}
```

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "isActive": true,
    "createdAt": "2025-10-11T12:00:00.000Z",
    "updatedAt": "2025-10-11T12:00:00.000Z"
  }
}
```

---

### Login
Autentica un usuario existente.

**Endpoint:** `POST /api/users/login`

**Body (JSON):**
```json
{
  "username": "usuario123",
  "password": "miPassword123"
}
```

**Ejemplo con Fetch:**
```javascript
async function loginUser() {
  try {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'usuario123',
        password: 'miPassword123'
      })
    });

    const data = await response.json();
    
    if (data.success) {
      console.log('Login exitoso:', data.data);
      // Guardar información del usuario logueado
      localStorage.setItem('user', JSON.stringify(data.data));
      localStorage.setItem('isLoggedIn', 'true');
      // Redirigir al dashboard
      window.location.href = '/dashboard';
    } else {
      console.error('Error:', data.message);
      alert('Usuario o contraseña incorrectos');
    }
  } catch (error) {
    console.error('Error en el login:', error);
  }
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "isActive": true,
    "createdAt": "2025-10-11T12:00:00.000Z",
    "updatedAt": "2025-10-11T12:00:00.000Z"
  }
}
```

**Respuesta Error (401):**
```json
{
  "success": false,
  "message": "Usuario o contraseña incorrectos"
}
```

---

### Obtener Usuario por ID
Obtiene la información de un usuario específico.

**Endpoint:** `GET /api/users/:id`

**Ejemplo con Fetch:**
```javascript
async function getUserById(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Usuario:', data.data);
      return data.data;
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error al obtener usuario:', error);
  }
}

// Uso
getUserById(1);
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "usuario123",
    "email": "usuario@ejemplo.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "isActive": true,
    "createdAt": "2025-10-11T12:00:00.000Z",
    "updatedAt": "2025-10-11T12:00:00.000Z"
  }
}
```

---

### Listar Usuarios
Obtiene todos los usuarios activos del sistema.

**Endpoint:** `GET /api/users`

**Ejemplo con Fetch:**
```javascript
async function getAllUsers() {
  try {
    const response = await fetch('http://localhost:3000/api/users');
    const data = await response.json();
    
    if (data.success) {
      console.log('Usuarios:', data.data);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "username": "usuario123",
      "email": "usuario@ejemplo.com",
      "firstName": "Juan",
      "lastName": "Pérez",
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z"
    }
  ]
}
```

---

## 📂 Categorías

### Listar Categorías
Obtiene todas las categorías disponibles.

**Endpoint:** `GET /api/categories`

**Ejemplo con Fetch:**
```javascript
async function getAllCategories() {
  try {
    const response = await fetch('http://localhost:3000/api/categories');
    const data = await response.json();
    
    if (data.success) {
      console.log('Categorías:', data.data);
      // Renderizar categorías en el UI
      renderCategories(data.data);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener categorías:', error);
  }
}

function renderCategories(categories) {
  const container = document.getElementById('categories-container');
  container.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="loadCategoryWebinars(${cat.id})">
      <h3>${cat.name}</h3>
      <p>${cat.description || ''}</p>
      <span>${cat._count.webinars} webinars</span>
    </div>
  `).join('');
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Programación",
      "description": "Cursos y webinars de programación",
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "_count": {
        "webinars": 5
      }
    },
    {
      "id": 2,
      "name": "Marketing Digital",
      "description": "Estrategias de marketing",
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "_count": {
        "webinars": 3
      }
    }
  ]
}
```

---

### Obtener Categoría por ID
Obtiene una categoría específica con sus webinars.

**Endpoint:** `GET /api/categories/:id`

**Ejemplo con Fetch:**
```javascript
async function getCategoryById(categoryId) {
  try {
    const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Categoría:', data.data);
      console.log('Webinars de esta categoría:', data.data.webinars);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener categoría:', error);
  }
}

// Uso
getCategoryById(1);
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Programación",
    "description": "Cursos y webinars de programación",
    "createdAt": "2025-10-11T12:00:00.000Z",
    "updatedAt": "2025-10-11T12:00:00.000Z",
    "webinars": [
      {
        "id": 1,
        "title": "Introducción a Node.js",
        "description": "Aprende Node.js desde cero",
        "thumbnailUrl": "https://example.com/thumbnail.jpg",
        "createdAt": "2025-10-11T12:00:00.000Z",
        "_count": {
          "videos": 10
        }
      }
    ]
  }
}
```

---

## 🎓 Webinars

### Listar Webinars
Obtiene todos los webinars activos.

**Endpoint:** `GET /api/webinars`

**Ejemplo con Fetch:**
```javascript
async function getAllWebinars() {
  try {
    const response = await fetch('http://localhost:3000/api/webinars');
    const data = await response.json();
    
    if (data.success) {
      console.log('Webinars:', data.data);
      displayWebinars(data.data);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener webinars:', error);
  }
}

function displayWebinars(webinars) {
  const container = document.getElementById('webinars-grid');
  container.innerHTML = webinars.map(webinar => `
    <div class="webinar-card" onclick="viewWebinar(${webinar.id})">
      <img src="${webinar.thumbnailUrl}" alt="${webinar.title}">
      <h3>${webinar.title}</h3>
      <p>${webinar.description}</p>
      <span class="category">${webinar.category.name}</span>
      <span class="video-count">${webinar._count.videos} videos</span>
    </div>
  `).join('');
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Introducción a Node.js",
      "description": "Aprende Node.js desde cero",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Programación"
      },
      "_count": {
        "videos": 10
      }
    }
  ]
}
```

---

### Obtener Webinar por ID
Obtiene un webinar específico con todos sus videos.

**Endpoint:** `GET /api/webinars/:id`

**Ejemplo con Fetch:**
```javascript
async function getWebinarById(webinarId) {
  try {
    const response = await fetch(`http://localhost:3000/api/webinars/${webinarId}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Webinar:', data.data);
      console.log('Videos:', data.data.videos);
      renderWebinarDetail(data.data);
      return data.data;
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error al obtener webinar:', error);
  }
}

function renderWebinarDetail(webinar) {
  const container = document.getElementById('webinar-detail');
  container.innerHTML = `
    <div class="webinar-header">
      <img src="${webinar.thumbnailUrl}" alt="${webinar.title}">
      <h1>${webinar.title}</h1>
      <p>${webinar.description}</p>
      <span class="category">${webinar.category.name}</span>
    </div>
    <div class="video-list">
      <h2>Videos (${webinar.videos.length})</h2>
      ${webinar.videos.map(video => `
        <div class="video-item" onclick="playVideo(${video.id})">
          <img src="${video.thumbnailUrl}" alt="${video.title}">
          <div class="video-info">
            <h3>${video.order}. ${video.title}</h3>
            <p>${video.description || ''}</p>
            <span>${formatDuration(video.duration)}</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Uso
getWebinarById(1);
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Introducción a Node.js",
    "description": "Aprende Node.js desde cero",
    "thumbnailUrl": "https://example.com/thumbnail.jpg",
    "isActive": true,
    "createdAt": "2025-10-11T12:00:00.000Z",
    "updatedAt": "2025-10-11T12:00:00.000Z",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Programación",
      "description": "Cursos y webinars de programación"
    },
    "videos": [
      {
        "id": 1,
        "title": "Instalación de Node.js",
        "description": "Cómo instalar Node.js en tu sistema",
        "videoUrl": "https://example.com/videos/video1.mp4",
        "thumbnailUrl": "https://example.com/thumbnails/video1.jpg",
        "duration": 600,
        "order": 1,
        "isActive": true,
        "createdAt": "2025-10-11T12:00:00.000Z",
        "updatedAt": "2025-10-11T12:00:00.000Z",
        "webinarId": 1
      },
      {
        "id": 2,
        "title": "Primer servidor con Express",
        "description": "Creando tu primer servidor web",
        "videoUrl": "https://example.com/videos/video2.mp4",
        "thumbnailUrl": "https://example.com/thumbnails/video2.jpg",
        "duration": 900,
        "order": 2,
        "isActive": true,
        "createdAt": "2025-10-11T12:00:00.000Z",
        "updatedAt": "2025-10-11T12:00:00.000Z",
        "webinarId": 1
      }
    ]
  }
}
```

---

### Buscar Webinars
Busca webinars por título o descripción.

**Endpoint:** `GET /api/webinars/search?q={searchTerm}`

**Ejemplo con Fetch:**
```javascript
async function searchWebinars(searchTerm) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/webinars/search?q=${encodeURIComponent(searchTerm)}`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log('Resultados de búsqueda:', data.data);
      displaySearchResults(data.data, searchTerm);
      return data.data;
    }
  } catch (error) {
    console.error('Error en la búsqueda:', error);
  }
}

// Ejemplo con input de búsqueda
document.getElementById('search-input').addEventListener('input', (e) => {
  const searchTerm = e.target.value.trim();
  if (searchTerm.length >= 3) {
    searchWebinars(searchTerm);
  }
});

// Uso directo
searchWebinars('Node.js');
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Introducción a Node.js",
      "description": "Aprende Node.js desde cero",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Programación"
      },
      "_count": {
        "videos": 10
      }
    }
  ]
}
```

---

### Webinars por Categoría
Obtiene todos los webinars de una categoría específica.

**Endpoint:** `GET /api/webinars/category/:categoryId`

**Ejemplo con Fetch:**
```javascript
async function getWebinarsByCategory(categoryId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/webinars/category/${categoryId}`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log('Webinars de la categoría:', data.data);
      displayWebinars(data.data);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener webinars por categoría:', error);
  }
}

// Uso
getWebinarsByCategory(1);
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Introducción a Node.js",
      "description": "Aprende Node.js desde cero",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "categoryId": 1,
      "category": {
        "id": 1,
        "name": "Programación"
      },
      "_count": {
        "videos": 10
      }
    }
  ]
}
```

---

## 🎥 Videos

### Listar Videos
Obtiene todos los videos activos.

**Endpoint:** `GET /api/videos`

**Ejemplo con Fetch:**
```javascript
async function getAllVideos() {
  try {
    const response = await fetch('http://localhost:3000/api/videos');
    const data = await response.json();
    
    if (data.success) {
      console.log('Videos:', data.data);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener videos:', error);
  }
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Instalación de Node.js",
      "description": "Cómo instalar Node.js en tu sistema",
      "videoUrl": "https://example.com/videos/video1.mp4",
      "thumbnailUrl": "https://example.com/thumbnails/video1.jpg",
      "duration": 600,
      "order": 1,
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "webinarId": 1,
      "webinar": {
        "id": 1,
        "title": "Introducción a Node.js",
        "thumbnailUrl": "https://example.com/thumbnail.jpg",
        "category": {
          "id": 1,
          "name": "Programación"
        }
      }
    }
  ]
}
```

---

### Obtener Video por ID
Obtiene un video específico con información del webinar.

**Endpoint:** `GET /api/videos/:id`

**Ejemplo con Fetch:**
```javascript
async function getVideoById(videoId) {
  try {
    const response = await fetch(`http://localhost:3000/api/videos/${videoId}`);
    const data = await response.json();
    
    if (data.success) {
      console.log('Video:', data.data);
      playVideo(data.data);
      return data.data;
    } else {
      console.error('Error:', data.message);
    }
  } catch (error) {
    console.error('Error al obtener video:', error);
  }
}

function playVideo(video) {
  const player = document.getElementById('video-player');
  player.innerHTML = `
    <video controls width="100%" poster="${video.thumbnailUrl}">
      <source src="${video.videoUrl}" type="video/mp4">
      Tu navegador no soporta video HTML5.
    </video>
    <div class="video-info">
      <h2>${video.title}</h2>
      <p>${video.description || ''}</p>
      <span>Webinar: ${video.webinar.title}</span>
      <span>Categoría: ${video.webinar.category.name}</span>
    </div>
  `;
}

// Uso
getVideoById(1);
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Instalación de Node.js",
    "description": "Cómo instalar Node.js en tu sistema",
    "videoUrl": "https://example.com/videos/video1.mp4",
    "thumbnailUrl": "https://example.com/thumbnails/video1.jpg",
    "duration": 600,
    "order": 1,
    "isActive": true,
    "createdAt": "2025-10-11T12:00:00.000Z",
    "updatedAt": "2025-10-11T12:00:00.000Z",
    "webinarId": 1,
    "webinar": {
      "id": 1,
      "title": "Introducción a Node.js",
      "description": "Aprende Node.js desde cero",
      "thumbnailUrl": "https://example.com/thumbnail.jpg",
      "category": {
        "id": 1,
        "name": "Programación"
      }
    }
  }
}
```

---

### Videos por Webinar
Obtiene todos los videos de un webinar específico.

**Endpoint:** `GET /api/videos/webinar/:webinarId`

**Ejemplo con Fetch:**
```javascript
async function getVideosByWebinar(webinarId) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/videos/webinar/${webinarId}`
    );
    const data = await response.json();
    
    if (data.success) {
      console.log('Videos del webinar:', data.data);
      renderVideoPlaylist(data.data);
      return data.data;
    }
  } catch (error) {
    console.error('Error al obtener videos del webinar:', error);
  }
}

function renderVideoPlaylist(videos) {
  const playlist = document.getElementById('playlist');
  playlist.innerHTML = videos.map((video, index) => `
    <div class="playlist-item" onclick="loadVideo(${video.id})">
      <span class="number">${video.order}</span>
      <img src="${video.thumbnailUrl}" alt="${video.title}">
      <div class="info">
        <h4>${video.title}</h4>
        <span>${formatDuration(video.duration)}</span>
      </div>
    </div>
  `).join('');
}

// Uso
getVideosByWebinar(1);
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Instalación de Node.js",
      "description": "Cómo instalar Node.js en tu sistema",
      "videoUrl": "https://example.com/videos/video1.mp4",
      "thumbnailUrl": "https://example.com/thumbnails/video1.jpg",
      "duration": 600,
      "order": 1,
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "webinarId": 1
    },
    {
      "id": 2,
      "title": "Primer servidor con Express",
      "description": "Creando tu primer servidor web",
      "videoUrl": "https://example.com/videos/video2.mp4",
      "thumbnailUrl": "https://example.com/thumbnails/video2.jpg",
      "duration": 900,
      "order": 2,
      "isActive": true,
      "createdAt": "2025-10-11T12:00:00.000Z",
      "updatedAt": "2025-10-11T12:00:00.000Z",
      "webinarId": 1
    }
  ]
}
```

---

## 🛠️ Utilidades para el Frontend

### Clase Helper para API Calls
```javascript
class StreamingAPI {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Users
  async register(userData) {
    return this.request('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(username, password) {
    return this.request('/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  }

  async getUser(userId) {
    return this.request(`/users/${userId}`);
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  async getCategory(categoryId) {
    return this.request(`/categories/${categoryId}`);
  }

  // Webinars
  async getWebinars() {
    return this.request('/webinars');
  }

  async getWebinar(webinarId) {
    return this.request(`/webinars/${webinarId}`);
  }

  async searchWebinars(query) {
    return this.request(`/webinars/search?q=${encodeURIComponent(query)}`);
  }

  async getWebinarsByCategory(categoryId) {
    return this.request(`/webinars/category/${categoryId}`);
  }

  // Videos
  async getVideos() {
    return this.request('/videos');
  }

  async getVideo(videoId) {
    return this.request(`/videos/${videoId}`);
  }

  async getVideosByWebinar(webinarId) {
    return this.request(`/videos/webinar/${webinarId}`);
  }
}

// Uso
const api = new StreamingAPI();

// Login
const loginResult = await api.login('usuario123', 'password');

// Obtener categorías
const categories = await api.getCategories();

// Buscar webinars
const searchResults = await api.searchWebinars('Node.js');
```

---

### Manejo de Autenticación
```javascript
// auth.js
class Auth {
  static isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  static getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static async login(username, password) {
    const api = new StreamingAPI();
    const result = await api.login(username, password);
    
    if (result.success) {
      localStorage.setItem('user', JSON.stringify(result.data));
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }

  static logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  }

  static requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = '/login';
      return false;
    }
    return true;
  }
}

// Uso en páginas protegidas
if (Auth.requireAuth()) {
  // Cargar contenido
  const user = Auth.getUser();
  console.log('Usuario logueado:', user);
}
```

---

## 📊 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Parámetros inválidos |
| 401 | Unauthorized - No autorizado |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE:**
- Las contraseñas actualmente NO están hasheadas. En producción debes implementar bcrypt.
- No hay sistema de tokens JWT implementado. Considera agregar autenticación con JWT.
- Implementa CORS en el backend si el frontend está en un dominio diferente.
- Valida siempre los datos en el backend antes de guardar en la base de datos.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar .env
DATABASE_URL="sqlserver://localhost:1433;database=streaming_video;user=sa;password=yourpassword;encrypt=true;trustServerCertificate=true"

# 3. Generar Prisma Client
npx prisma generate

# 4. Ejecutar migraciones
npx prisma migrate dev --name init

# 5. Iniciar servidor
npm run dev
```

---

## 📞 Soporte

Para más información, consulta el código fuente o contacta al equipo de desarrollo.

**Versión:** 1.0.0  
**Última actualización:** 11 de octubre de 2025
