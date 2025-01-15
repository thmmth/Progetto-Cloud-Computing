const mongoose = require("mongoose");

const socialDataSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  likes: { type: Number, required: true },
  comments: { type: Number, required: true },
});

module.exports = mongoose.model("SocialData", socialDataSchema);
