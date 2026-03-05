const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  matchesPlayed: {
    type: Number,
    default: 0
  },
  goals: {
    type: Number,
    default: 0
  },
  assists: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  marketValue: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Player", playerSchema);
