const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  PostId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  UserId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  LikeTime: {
    type: Number,
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema, "Like");

module.exports.LikeModel = User;
