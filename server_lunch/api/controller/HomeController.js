var express = require('express')
var mongoose = require('mongoose')
var multer = require('multer')
// var libexpre = require('./SocketIo')
var fs = require('fs')
var path = require('path')
var myPath = path.join(__dirname, '../../public/')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/Images/')
  },
  filename: function (req, file, cb) {
    // console.log(file)
    let fileExtension = file.originalname.split('.')[1]
    cb(null, Date.now() + '.' + fileExtension)
  }
})
var upload = multer({ storage: storage })
var homeController = express.Router()

require('../model/food')
require('../model/menu')
require('../model/order')
require('../model/orderdetail')
require('../model/user')

var bodyParser = require('body-parser')
homeController.use(bodyParser.json()) // support json encoded bodies
homeController.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

//  Model decleration
const Food = mongoose.model('Food')
// const Menu = mongoose.model('Menu')
// const Order = mongoose.model('Order')
const OrderDetail = mongoose.model('OrderDetail')
// const User = mongoose.model('User')

homeController.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

homeController.get('/MenuFood', (req, res) => {
  Food.find().lean().exec((err, FoodMenu) => {
    (err) ? res.send(err) : res.json({ message: 'Happy 200', FoodMenu: FoodMenu })
  })
})

homeController.post('/OrderDetail', (req, res) => {
  var listOr = req.body.listorder
  var username = req.body.username
  listOr.map(item => {
    var myOrDetial = new OrderDetail()
    myOrDetial.fkFood = item
    myOrDetial.fkUser = username
    myOrDetial.count = 1
    myOrDetial.save()
    console.log(item + ' ' + username)
  })
  res.json({
    message: 'Have a nice day'
  })
})
homeController.get('/ListOrder', (req, res) => {
  OrderDetail.find().lean().exec((err, OrderList) => {
    (err) ? res.send(err) : res.json({ message: 'Happy 200', OrderList: OrderList })
  })
})
// Delete API
homeController.get('/Delete/:idFood', (req, res) => {
  let idFood = req.params.idFood
  const Food = mongoose.model('Food')
  Food.findOne({_id: idFood}).exec((err, data) => {
    if (err) {
      console.log(err)
    } else {
      fs.unlink(myPath + data.images, function (error) {
        if (error) {
          throw error
        }
      })
      Food.deleteOne({_id: idFood}).exec((err, data) => {
        if (err) return err
        res.json({
          message: 'happy',
          status: 200
        })
      })
    }
  })
  // console.log(idFood)
  // console.log(subFood)
  // console.log(myPath)
})
homeController.post('/CreateFood', upload.single('fd_images'), (req, res) => {
  var Foodnews = new Food()
  Foodnews.title = req.body.fd_title
  Foodnews.price = req.body.fd_price
  Foodnews.unit = req.body.fd_unit
  Foodnews.images = '/Images/' + req.file.filename
  Foodnews.save()
  // console.log(req.body)
  // console.log(req.file)
  res.json({
    status: 200,
    message: 'Save Complete'
  })
})

module.exports = homeController
