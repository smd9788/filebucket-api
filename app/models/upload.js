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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
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
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // tag: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Tag',
  //   required: false
  // },
  // dateCreated: {
  //   type: Date,
  //   required: true
  // },
  // dateModified: {
  //   type: Date,
  //   required: true
  // },
  // title: {
  //   type: String,
  //   required: true
  // }
}, {
  timestamps: true
})

module.exports = mongoose.model('upload', uploadSchema)
