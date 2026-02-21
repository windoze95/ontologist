const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { initDB } = require('./db/seed');
const aiRoutes = require('./routes/ai');
const progressRoutes = require('./routes/progress');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// API routes
app.use('/api/ai', aiRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/profile', profileRoutes);

// Serve static frontend in production
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Initialize DB and start server
initDB();

app.listen(PORT, () => {
  console.log(`Ontologist server running on http://localhost:${PORT}`);
});
