const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
require("dotenv").config();

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174', 'https://frontendstreamingvideovercel.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos de rutas
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const webinarRoutes = require('./routes/webinarRoutes');
const videoRoutes = require('./routes/videoRoutes');

// Rutas de la API
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/webinars', webinarRoutes);
app.use('/api/videos', videoRoutes);


module.exports = app;
