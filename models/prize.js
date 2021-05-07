const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// museum schema definition
const PrizeSchema = new Schema({
  _id: ObjectId,
  user: String,
  points: Number,
  total: Number,
  badge: String,
  image: String
})

module.exports = mongoose.model('prizes', PrizeSchema)
