const express = require('express')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

module.exports = {express, app, http, io}
