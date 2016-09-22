'use-strict'
var express = require('express')
var app = express()
var model = require("./models/index")
var routes = require('./routes/index.js')

app.set('view-engine', 'ejs')

app.listen(3000,function(){
  console.log('listening on 3000')
})

app.use('/', routes)
