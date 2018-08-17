const mongoose = require('mongoose')

var Schema = mongoose.Schema

var foodSchema = new Schema({
  title: String,
  price: Number,
  unit: String,
  note: String,
  images: String,
  fkMenu: String
})

foodSchema.set('toJSON', {virtual: true})

module.export = mongoose.model('Food', foodSchema)
