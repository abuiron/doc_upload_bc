const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/applicants', require('./routes/applicants'));
app.use('/api/documents', require('./routes/documents'));

// html 
app.get('/', (req, res)=>{
  res.send('<h1> Server is Running!</h1> <p>Use API endpoints like /api/applicants</p>')
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
