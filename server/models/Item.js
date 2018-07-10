const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    default: ""
  },
  size: {
    type: String,
    default: ""
  },
  color: {
    type: String,
    default: ""
  },
  price: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Item', ItemSchema);
