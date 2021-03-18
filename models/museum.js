const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// museum schema definition
const MuseumSchema = new Schema({
  _id: ObjectId,
  name: String,
  address: String,
  city: String,
  country: String,
  location: Array,
  expositions: Array,
  descriptions: Object,
  image: String
})

module.exports = mongoose.model('museums', MuseumSchema)
