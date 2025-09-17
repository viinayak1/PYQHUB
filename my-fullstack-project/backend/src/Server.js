require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const allowedOrigins = [
<<<<<<< HEAD
  "http://localhost:3000",                // for local React dev
  "https://pyqhub-8-backend.onrender.com",  // your Render backend URL
  "https://pyqhub-rduq.vercel.app"         // your frontend deployed URL (no trailing slash)
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Serve static PDF files from the 'pdfs' folder
app.use('/pdfs', express.static('public/pdfs'));

// MongoDB connection
mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Subject schema and model
const subjectSchema = new mongoose.Schema({
  semester: Number,
  name: String,
  pdfUrl: String,
});
const Subject = mongoose.model("Subject", subjectSchema, "paper");

// API route: Get subjects by semester
app.get("/api/semesters/:semester/subjects", async (req, res) => {
  try {
    const semester = parseInt(req.params.semester, 10);
    const subjects = await Subject.find({ semester });
    res.json(subjects);
  } catch (err) {
    console.error("❌ Error fetching subjects:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on port ${PORT}`);
});
