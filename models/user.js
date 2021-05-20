const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// exposition schema definition
const UserSchema = new Schema({
  _id: ObjectId,
  userId: String,
  name: String,
  email: String,
  bio: String,
  favourites: Array,
  points: Number,
  profilePic: String,
  premium: Boolean,
  visited: Array,
  likes: Array,
  banDate: Date,
  totalBans: Number,
  totalReports: Number,
  premiumDate: Date
})

module.exports = mongoose.model('users', UserSchema)
