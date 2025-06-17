const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
