const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema({
  user: String,
  product: {
    name: String,
    price: Number,
    category: String
  },
  result: [
    {
      product: String,
      outcome: {
        health: Number,
        finance: Number,
        career: Number,
        happiness: Number
      }
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("DecisionHistory", decisionSchema);
