const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` 🚀 MOBILAI Smart Mobility API Server Active`);
  console.log(` 📍 Port: http://localhost:${PORT}`);
  console.log(` 🛰️ Health Check: http://localhost:${PORT}/api/health`);
  console.log(` 🚦 Traffic API: http://localhost:${PORT}/api/traffic`);
  console.log(` 🧭 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`===============================================`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('[MOBILAI] SIGTERM received. Closing server gracefully...');
  server.close(() => {
    console.log('[MOBILAI] Process terminated.');
  });
});
