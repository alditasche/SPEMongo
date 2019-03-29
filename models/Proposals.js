const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({


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

var Proposals = mongoose.model('proposals', ProposalSchema);

module.exports = Proposals;