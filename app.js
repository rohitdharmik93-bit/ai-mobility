const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { errorHandler, notFoundHandler } = require('./middleware/errorMiddleware');

// Route Handlers
const dashboardRoutes = require('./routes/dashboardRoutes');
const trafficRoutes = require('./routes/trafficRoutes');
const routeRoutes = require('./routes/routeRoutes');
const mobilityRoutes = require('./routes/mobilityRoutes');
const alertRoutes = require('./routes/alertRoutes');
const ecoRoutes = require('./routes/ecoRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();

// CORS Configuration
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow local development and specified FRONTEND_URL
    if (
      process.env.NODE_ENV !== 'production' ||
      origin === frontendUrl ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1') ||
      origin.includes('.vercel.app')
    ) {
      return callback(null, true);
    }
    return callback(null, true); // Permissive in hackathon mode to avoid cross-domain blocking
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check Endpoint (Section 40)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    service: 'MOBILAI API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/traffic', trafficRoutes);
app.use('/api/route', routeRoutes);
app.use('/api/mobility', mobilityRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/eco-stats', ecoRoutes);
app.use('/api/eco', ecoRoutes);
app.use('/api/profile', profileRoutes);

// 404 Handler
app.use(notFoundHandler);

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
