const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  Type: {
    type: String,
    enum: ["TravelTools", "Tourism", "Entertainment", "Hotel", "Others"],
    default: "user",
  },
  Title: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Images: {
    type: [String],
  },
  Description: {
    type: String,
    required: true,
  },
  Features: {
    type: [String],
  },
  Vote: {
    type: Number,
    required: true,
  },
  VoteCount: {
    type: Number,
    required: true,
  },
  Company: {
    type: [String],
  },
  StartTime: {
    type: Number,
    required: true,
  },
  EndTime: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model("Service", serviceSchema, "Service");

module.exports.ServiceModel = Service;
