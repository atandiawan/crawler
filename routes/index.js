'use-strict'
var express = require('express')
var scraper = require('../helper/scraper.js')
var router = express.Router()
var model = require('../models/index')
var bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({extended: true}))

router.get('/',function(req,res,next){
  res.render('menu.ejs')
})


router.get('/display',function(req,res,next){
  model.barangs.findAll().then(function(result){
    console.log(result)
    res.render('index.ejs', {barang:result})
  })
})

router.post('/scrape-lazada',function(req,res,next){
  scraper.Lazada(function(){
    res.redirect('/')
  })
})

router.post('/scrape-elevenia',function(req,res,next){
  scraper.Elevenia(function(){
    res.redirect('/')
  })
})

router.post('/add-barang', function(req,res,next){
  model.barangs.create({nama_barang: req.body.nama_barang, harga_barang: req.body.harga_barang, vendor_name: req.body.vendor_name})
  console.log('barang tertambah')
  res.redirect('/')
})

router.post('/delete-barang', function(req,res,next){
  model.barangs.destroy({where:{id: req.body.id}})
  console.log('barang tertambah')
  res.redirect('/')
})


module.exports = router
