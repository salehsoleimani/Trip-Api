const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    min: 6,
    max: 30,
    trim: true,
    unique: true,
  },
  Password: {
    type: String,
    max: 1024,
    min: 6,
    required: true,
  },
  Email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "EMAIL_IS_NOT_VALID",
    },
    lowercase: true,
    unique: true,
    required: true,
  },
  Credit: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now() / 1000,
  },
});

const User = mongoose.model("User", userSchema, "User");

module.exports = User;
