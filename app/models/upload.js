const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tag: {
    type: String,
    required: false
  },
  dateCreated: {
    type: Date,
    required: false
  },
  dateModified: {
    type: Date,
    required: false
  },
  title: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('upload', uploadSchema)
