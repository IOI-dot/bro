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

// --- THE ULTIMATE CORS FIX ---
app.use(cors({
  origin: true, // Accepts requests from ANY dynamic Vercel URL and reflects it back
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

// Parse incoming JSON requests
app.use(express.json());

// --- CONNECT ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/timeline', timelineRoutes);

// --- HEALTH CHECK ---
// Good for testing if Vercel actually deployed the backend successfully
app.get('/', (req, res) => {
    res.status(200).json({ message: "Backend is awake and ready to go! 🚀" });
});

// --- DATABASE SYNC ---
sequelize.sync({ alter: true })
  .then(() => console.log('✅ PostgreSQL Connected & Synced'))
  .catch(err => console.error('❌ Database Sync Error:', err));

// --- LOCAL DEV VS VERCEL EXPORT ---
// Vercel handles the ports automatically, but you need this to test locally!
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`💻 Local server running on http://localhost:${PORT}`);
    });
}

// THIS LINE IS REQUIRED FOR VERCEL
module.exports = app;
