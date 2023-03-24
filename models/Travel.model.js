const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
  Origin: {
    type: String,
    required: true,
  },
  Destination: {
    type: String,
    required: true,
  },
  StartTime: {
    type: Number,
    required: true,
  },
  EndTime: {
    type: Number,
    required: true,
  },
  PassengerCount: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    required: true,
    enum: ["Tourism", "Entertainment", "Pilgrimage", "Work"],
  },
  Price: {
    type: Number,
    required: true,
  },
  Days: {
    type: [
      [
        new mongoose.Schema({
          Time: Number,
          UserId: mongoose.Schema.Types.ObjectId,
        }),
      ],
    ],
    required: true,
  },
});

const Travel = mongoose.model("Travel", travelSchema, "Travel");

module.exports.TravelModel = Travel;
