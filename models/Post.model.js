const mongoose = require("mongoose");
const { userSchema } = require("../models/User.model");

const postSchema = new mongoose.Schema({
  Image: {
    type: String,
    required: true,
  },
  TravelId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  Description: String,
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema, "Post");

module.exports.PostModel = Post;
