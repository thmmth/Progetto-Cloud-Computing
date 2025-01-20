const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  postId: { type: String, required: true, unique: true }, // ID unico del post
  platform: { type: String, default: "Instagram" },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
  retrievedAt: { type: Date, default: Date.now }, // Data del recupero
});

module.exports = mongoose.model("Post", PostSchema);
