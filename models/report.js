const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// artwork schema definition
const ReportSchema = new Schema({
  _id: ObjectId,
  informant: String,
  reported: String,
  date: Date,
  comment: String
})

module.exports = mongoose.model('reports', ReportSchema)
