var mongoose = require('mongoose')

var Schema = mongoose.Schema

var user = new Schema({
  username: String,
  password: String,
  avatar: String,
  name: String,
  phone: String,
  email: String
})

user.set('toJSON', {virtual: true})
mongoose.model('User', user)
