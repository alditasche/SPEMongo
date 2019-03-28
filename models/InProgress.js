const mongoose = require('mongoose');

const InProgress = new mongoose.Schema({


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
  },


});

var Proposals = mongoose.model('inprogress', InProgress);

module.exports = Proposals;