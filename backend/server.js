require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

// Import modular routes
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const timelineRoutes = require('./routes/timeline'); // Added from friend's push

const app = express();
const PORT = process.env.PORT || 3000;

// --- UPDATED CORS CONFIGURATION ---
app.use(cors({
    origin: [
        "https://brethen-37t1iwluz-ioi-dots-projects.vercel.app", 
        "http://localhost:5173" // Keeps local development working too!
    ], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

// --- CONNECT ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/timeline', timelineRoutes); // Added from friend's push

sequelize.sync({ alter: true })
    .then(() => console.log('✅ PostgreSQL Connected & Synced'))
    .catch(err => console.error('❌ Database Sync Error:', err));

// THIS LINE IS REQUIRED FOR VERCEL
module.exports = app;
