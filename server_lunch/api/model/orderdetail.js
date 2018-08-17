var mongoose = require('mongoose')

var Schema = mongoose.Schema

var orderdetail = new Schema({
  fkFood: String,
  count: Number,
  fkOrder: String,
  fkUser: String
})

orderdetail.set('toJSON', {virtual: true})

mongoose.model('OrderDetail', orderdetail)
