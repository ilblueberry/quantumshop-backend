const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const passport = require("passport");

dotenv.config();

const app = express();

// Enable CORS to allow frontend access (with cookies!)
app.use(cors({
  origin: "http://localhost:3000",  // ✅ your React frontend
  credentials: true                 // ✅ allow cookies/session sharing
}));

// Parse JSON request bodies
app.use(express.json());

// Session setup for storing login state
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,        // ⚠️ Set to true only if using HTTPS in production
    httpOnly: true,
    sameSite: "lax"       // or "none" if frontend is on a different domain
  }
}));

// Initialize Passport for Google login
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`)
    );
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });

// Routes
app.use("/auth", require("./routes/auth"));  // Google login routes
app.use("/api", require("./routes/api"));    // Product + Decision routes
