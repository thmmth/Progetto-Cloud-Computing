require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const SocialData = require("./models/SocialData"); // Modello esistente
const Post = require("./models/Post"); // Nuovo modello per i post Instagram

const app = express();
const PORT = process.env.PORT || 5001;

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

// Rotta per ottenere tutti i dati di SocialData
app.get("/api/social-data", async (req, res) => {
  try {
    const data = await SocialData.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recuperare i dati" });
  }
});

// Rotta per aggiungere nuovi dati a SocialData
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

// Rotta per ottenere tutti i post di Instagram
app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recuperare i post" });
  }
});

// Rotta per aggiungere un nuovo post di Instagram
app.post("/api/posts", async (req, res) => {
  const { postId, likes, comments } = req.body;
  try {
    const newPost = new Post({ postId, likes, comments });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiungere il post" });
  }
});

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});