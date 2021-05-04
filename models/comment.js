const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// museum schema definition
const CommentSchema = new Schema({
  _id: ObjectId,
  content: String,
  author: String,
  artwork: String,
  datetime: Date,
  image: String
})

module.exports = mongoose.model('comments', CommentSchema)
