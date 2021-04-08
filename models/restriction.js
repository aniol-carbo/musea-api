const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// museum schema definition
const RestrictionSchema = new Schema({
  _id: ObjectId,
  text: Object
})

module.exports = mongoose.model('restrictions', RestrictionSchema)
