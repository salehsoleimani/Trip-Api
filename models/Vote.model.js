const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  ServiceId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  UserId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  VoteTime: {
    type: Date,
    required: true,
  },
  Vote: {
    type: Number,
    required: true,
  },
});

const Vote = mongoose.model("Vote", voteSchema, "Vote");

module.exports.VoteModel = Vote;
