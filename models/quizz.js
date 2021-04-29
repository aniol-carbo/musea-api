const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// museum schema definition
const QuizzSchema = new Schema({
  _id: ObjectId,
  question: Object,
  points: Number,
  answers: Array
})

module.exports = mongoose.model('quizzes', QuizzSchema)
