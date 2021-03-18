const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// exposition schema definition
const ExpositionSchema = new Schema({
  _id: ObjectId,
  name: String,
  room: String,
  descriptions: Object,
  works: Array,
  image: String
})

module.exports = mongoose.model('expositions', ExpositionSchema)
