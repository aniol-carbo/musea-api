const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// artwork schema definition
const RatingSchema = new Schema({
  _id: ObjectId,
  user: String,
  artwork: String,
  date: Date,
  score: Number
})

module.exports = mongoose.model('ratings', RatingSchema)
