const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { testConnection } = require('./config/database')
const libraryRoutes = require('./routes/libraryRoutes');
const { errorHandler, notFound } = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
        next();
    });
}

app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is Running',
        timestamp: new Date().toISOString(), 
        environment: process.env.NODE_ENV
    });
});

app.use('/api/library', libraryRoutes); // Mount the library routes')

app.get('/', (req, res) => {
    res.json({
        success: true,
    message: 'Sheet Music Library API',
    version: '1.0.0',
    endpoints: {
      library: '/api/library',
      health: '/api/health'
    }
    })
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await testConnection();
    
    app.listen(PORT, () => {
      console.log(`
🚀 Server running on port ${PORT}
📊 Environment: ${process.env.NODE_ENV || 'development'}
🔗 API Base URL: http://localhost:${PORT}/api
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
