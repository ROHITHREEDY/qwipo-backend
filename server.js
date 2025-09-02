const express = require('express');
const cors = require('cors');
const app = express();

const customerRoutes = require('./routes/customers');
// Add address routes similarly if needed
const errorHandler = require('./middleware/errorHandler');

// Updated CORS configuration to allow localhost and deployed frontend origin (replace with your frontend URL)
app.use(cors({
  origin: ['http://localhost:3000', 'https://qwipo-frontend-bice.vercel.app'], // Replace with your deployed frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// For testing, you can uncomment this to allow all origins:
// app.use(cors());

app.use(express.json());

// Simple logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/api/customers', customerRoutes);

app.use(errorHandler);

// Bind server to 0.0.0.0 for Render compatibility and use dynamic PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
