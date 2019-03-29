const mongoose = require('mongoose');

const CancelSchema = new mongoose.Schema({


  Name: {
    type: String,
    required: true
  },

  Vorname: {
    type: String,
    required: true
  },

  Email: {
    type: String,
    required: true
  },

  ProductName: {
    type: String,
    required: true
  }


});

var Cancel = mongoose.model('cancels', CancelSchema);

module.exports = Cancel;