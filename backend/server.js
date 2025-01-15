require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const SocialData = require("./models/SocialData");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Connessione al database MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

// Rotte API
// Ottieni i dati
app.get("/api/social-data", async (req, res) => {
  try {
    const data = await SocialData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recuperare i dati" });
  }
});

// Aggiungi nuovi dati
app.post("/api/social-data", async (req, res) => {
  const { platform, likes, comments } = req.body;
  try {
    const newData = new SocialData({ platform, likes, comments });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiungere i dati" });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
    res.send("Welcome to the Social Media Dashboard API");
  });
  