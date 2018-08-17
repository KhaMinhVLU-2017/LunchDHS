var libexpre = require('./api/controller/SocketIo')
var home = require('./api/controller/HomeController')

libexpre.app.use(libexpre.express.static('public'))
libexpre.app.use('/home', home)
// Socket-IO
libexpre.io.on('connection', (socket) => {
  console.log(`IP: ${socket.handshake.address} Port: ${socket.handshake.port}`)
  libexpre.io.on('disconnect', () => {
    console.log('Client: ' + socket.client.address + ' out')
  })
  socket.on('updatemgs', (mgs) => {
    if (mgs === 'complete') {
      console.log('Server Accept')
      libexpre.io.emit('updatemgs', 200)
    }
  })
  socket.on('createFoodIO', (mgs) => {
    if (mgs === 'postFile') {
      console.log('Server File Accept ' + mgs)
      libexpre.io.emit('createFoodIO', 200)
    }
    // if (mgs === 'del') {
    //   console.log('Delete File ' + mgs)
    //   libexpre.io.emit('createFoodIO', 200)
    // }
  })
})

libexpre.http.listen(3333, () => console.log('Example app listening on port 3333!'))

// Connect-DB-Mongo
var mongoose = require('mongoose')
mongoose.connect('mongodb://judasfate:lunchdhs2018@ds111192.mlab.com:11192/lunchdhs', { useNewUrlParser: true }, () => console.log('Connect Database Complete'))
mongoose.Promise = global.Promise
var db = mongoose.connection// ConnectDB
db.on('error', console.error.bind(console, 'connection error:'))

libexpre.app.get('/', (req, res) => res.send('Hello World!'))
