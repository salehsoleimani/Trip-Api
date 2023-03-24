const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  PostId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  Comment: {
    type: String,
    required: true,
  },
  SendTime: {
    type: Number,
    required: true,
  },
});

const Comment = mongoose.model("Comment", commentSchema, "Comment");

module.exports.CommentModel = Comment;