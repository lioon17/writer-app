const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seq: { type: Number, default: 100000 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
