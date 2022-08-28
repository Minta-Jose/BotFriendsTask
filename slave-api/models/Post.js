const mongoose = require("mongoose");

let postSchema = new mongoose.Schema(
  {
    webhookUrl: {
      type: String,
    },
    apiSecret: {
      type: String,
    },
  },
  { timestamps: true }
);

let Post = mongoose.model("post", postSchema);

module.exports = Post;


