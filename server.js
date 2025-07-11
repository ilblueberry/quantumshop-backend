// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Example test route
app.get('/', (req, res) => {
  res.send('QuantumShop Backend is live! 🚀');
});

console.log("🔍 MONGO_URI =", process.env.MONGO_URI); // add this before mongoose.connect

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const fakeWalmart = require('./routes/fakeWalmart');
app.use('/api/fake-walmart', fakeWalmart);
const decisionEngine = require('./routes/decisionEngine');
app.use('/api/decision', decisionEngine);
const decisionRoutes = require('./routes/decisionEngine');
app.use('/api/decision', decisionRoutes);
