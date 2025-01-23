require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const Post = require("./models/Post"); // Modello per i post Instagram

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Configura i CORS per consentire richieste solo dal frontend
const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.1.27:3000'], // Aggiungi entrambe le origini
  methods: ['GET', 'POST'], // Permette metodi GET e POST
  credentials: true, // Se necessario per autenticazione
};
app.use(cors(corsOptions));

// Connessione al database MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Rotte API

// Rotta per ottenere tutti i post
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Recupera i post dal database
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Errore nel recuperare i post' });
  }
});

// Rotta per aggiungere un nuovo post
app.post("/api/posts", async (req, res) => {
  const { postId, likes, comments } = req.body;
  try {
    const newPost = new Post({ postId, likes, comments });
    await newPost.save();
    console.log("🆕 Nuovo documento aggiunto a posts:", newPost);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("❌ Errore nell'aggiungere il post:", error);
    res.status(500).json({ error: "Errore nell'aggiungere il post" });
  }
});

// Rotta per importare i dati dall'API di Instagram
app.post("/api/posts/import", async (req, res) => {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || req.body.accessToken;

    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,like_count,comments_count&access_token=${accessToken}`
    );

    const posts = response.data.data;

    for (const post of posts) {
      const { id: postId, like_count: likes, comments_count: comments } = post;

      const existingPost = await Post.findOne({ postId });
      if (!existingPost) {
        const newPost = new Post({ postId, likes, comments });
        await newPost.save();
        console.log(`✅ Salvato post: ${postId}`);
      } else {
        console.log(`ℹ️ Post già esistente: ${postId}`);
      }
    }

    res.status(200).json({ message: "Post importati con successo" });
  } catch (error) {
    console.error("❌ Errore durante l'importazione dei post:", error.message);
    res.status(500).json({ error: "Errore durante l'importazione dei post" });
  }
});

// Avvia il server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
  console.log(`🌐 Accessibile dalla rete locale su http://<IP_DEL_SERVER>:${PORT}`);
});
