const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// artwork schema definition
const WorkSchema = new Schema({
    _id: ObjectId,
    title: String,
    author: String,
    descriptions: Object,
    score: Number,
    type: String,
    image: String
  })

module.exports = mongoose.model('artworks', WorkSchema)
