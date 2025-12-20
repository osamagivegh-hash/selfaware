require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// Import routes
const articleRoutes = require('./routes/articles');
const categoryRoutes = require('./routes/categories');
const authorRoutes = require('./routes/authors');

// Initialize Express app
const app = express();

// ============================================
// STARTUP LOGGING (Azure Diagnostics)
// ============================================
console.log('========================================');
console.log('SelfActual Backend - Starting...');
console.log('========================================');
console.log('NODE_ENV:', process.env.NODE_ENV || 'not set');
console.log('PORT:', process.env.PORT || '5000 (default)');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'SET (hidden)' : 'NOT SET ⚠️');
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN || 'not set (will use wildcard)');
console.log('========================================');

// ============================================
// Security Middleware
// ============================================

// Helmet - Security headers
app.use(helmet());

// CORS - Allow frontend access
// For Azure Container Apps, allow all origins initially to debug, then restrict
const corsOptions = {
    origin: process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map(s => s.trim())
        : '*', // Allow all if not specified (for debugging)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: process.env.CORS_ORIGIN ? true : false, // Only use credentials with specific origins
};
app.use(cors(corsOptions));

// Rate limiting (more permissive for initial testing)
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 500, // Increased for testing
    message: {
        success: false,
        message: 'Too many requests, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// ============================================
// General Middleware
// ============================================

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// ============================================
// HEALTH CHECK - MUST BE FIRST & SIMPLE
// Azure Container Apps requires immediate response
// ============================================

const API_PREFIX = process.env.API_PREFIX || '/api';

// Simple health check - NO database, NO async, immediate response
app.get(`${API_PREFIX}/health`, (req, res) => {
    res.status(200).send('OK');
});

// Root health check (some platforms check /)
app.get('/', (req, res) => {
    res.status(200).json({
        service: 'SelfActual API',
        status: 'running',
        version: '1.0.0',
    });
});

// Detailed health check (optional, for debugging)
app.get(`${API_PREFIX}/health/detailed`, async (req, res) => {
    const mongoStatus = mongoose.connection.readyState;
    const mongoStates = {
        0: 'disconnected',
        1: 'connected',
        2: 'connecting',
        3: 'disconnecting',
    };

    res.status(200).json({
        success: true,
        message: 'SelfActual API is running',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'not set',
        mongodb: mongoStates[mongoStatus] || 'unknown',
    });
});

// ============================================
// Database Connection (NON-BLOCKING)
// ============================================

let isMongoConnected = false;

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI is not set! Database features will not work.');
        return;
    }

    try {
        console.log('📡 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // 10 second timeout
            socketTimeoutMS: 45000,
        });
        isMongoConnected = true;
        console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error('⚠️ Server will continue running, but database features will fail.');
        // DO NOT exit - let the server run for health checks
    }
};

// Handle MongoDB connection errors after initial connection
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    isMongoConnected = false;
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Attempting to reconnect...');
    isMongoConnected = false;
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
    isMongoConnected = true;
});

// ============================================
// Database Check Middleware
// ============================================

const requireDatabase = (req, res, next) => {
    if (!isMongoConnected) {
        return res.status(503).json({
            success: false,
            message: 'Database is temporarily unavailable. Please try again later.',
        });
    }
    next();
};

// ============================================
// API Routes (require database)
// ============================================

app.use(`${API_PREFIX}/articles`, requireDatabase, articleRoutes);
app.use(`${API_PREFIX}/categories`, requireDatabase, categoryRoutes);
app.use(`${API_PREFIX}/authors`, requireDatabase, authorRoutes);

// ============================================
// Error Handling
// ============================================

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({
            success: false,
            message: 'Validation Error',
            errors: messages,
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate field value entered',
        });
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: `Invalid ${err.path}: ${err.value}`,
        });
    }

    // Default server error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
});

// ============================================
// Start Server (CRITICAL: Bind to 0.0.0.0)
// ============================================

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // CRITICAL for Azure Container Apps

// Start server FIRST, then connect to MongoDB (non-blocking)
app.listen(PORT, HOST, () => {
    console.log(`
╔══════════════════════════════════════════╗
║     SelfActual Backend API Started       ║
╠══════════════════════════════════════════╣
║  🚀 Server:  http://${HOST}:${PORT}            ║
║  📊 API:     /api                        ║
║  💚 Health:  /api/health                 ║
║  🌍 Env:     ${(process.env.NODE_ENV || 'development').padEnd(26)}║
╚══════════════════════════════════════════╝
    `);

    // Connect to MongoDB AFTER server is listening
    // This ensures health checks work even if MongoDB is slow
    connectDB();
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed.');
        process.exit(0);
    });
});

module.exports = app;
