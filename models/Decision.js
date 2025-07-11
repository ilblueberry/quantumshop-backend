const mongoose = require('mongoose');

const DecisionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  inputProduct: Object,
  alternateProduct: Object,
  result: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Decision', DecisionSchema);
