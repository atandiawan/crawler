  const Data = require('../models/datas')
  var scraper = require('../helpers/scraper.js')
  var cheerio = require('cheerio')
  var request = require('request')

  module.exports = {
  showDatas     : showDatas,
  showData      : showData,
  seedDatas     : seedDatas,
  showAdd       : showAdd,
  processAdd    : processAdd,
  showEdit      : showEdit,
  processEdit   : processEdit,
  deleteData    : deleteData,
  importLazada  : importLazada,
  importElevenia : importElevenia
  }
    
    //import data from lazada
    function importLazada(req,res) {
      scraper.Lazada( () => {
        req.flash('success', 'Data is imported!')
        res.redirect('/datas')
      })
    }

    //import data from elevenia
    function importElevenia(req,res) {
      scraper.Elevenia( () => {
        req.flash('success', 'Data is imported!')
        res.redirect('/datas')
      }) 
    }

    //delete data
    function deleteData(req,res) {
      Data.remove({ slug: req.params.slug}, (err) => {
        //set flash Data
        //redirect to datas page
        req.flash('success', 'Data is deleted!')
        res.redirect('/datas')
      })
    }

    //edit data
    function showEdit(req,res) {
      Data.findOne({ slug: req.params.slug }, (err, data) => {
        res.render('pages/edit',{
          data: data,
          errors: req.flash('errors')
        })
      })
    }

    function processEdit(req,res) {
      //validate information
      req.checkBody('name', 'Name is required').notEmpty()
      req.checkBody('price', 'Price is required').notEmpty()
      req.checkBody('vendor', 'vendor is required').notEmpty()

      //if there are errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if(errors){
        req.flash('errors',errors.map(err => err.msg))
        return res.redirect(`/datas/${req.params.slug}/edit`)
      }

      //finding a current data
      Data.findOne({slug: req.params.slug}, (err,data) => {
        //update the data
        data.name = req.body.name
        data.price = req.body.price
        data.vendor = req.body.vendor

        data.save((err) => {
          if(err)
            throw err;

          //success flash message
          //redirect back to /data
          req.flash('success', 'Successfully updated data')
          res.redirect('/datas')
        })
      })
    }

    //add data
    function showAdd(req,res){
      res.render('pages/add', {
        errors: req.flash('errors')
      })
    }

    function processAdd(req,res){
      //validate information
      req.checkBody('name', 'Name is required').notEmpty()
      req.checkBody('price', 'Price is required').notEmpty()
      req.checkBody('vendor', 'vendor is required').notEmpty()

      //if there's errors, redirect and save errors to flash
      const errors = req.validationErrors()
      if(errors){
          req.flash('errors',errors.map(err => err.msg))
          return res.redirect('/datas/add')
      }

      //create a new data
      var data = new Data({
        name : req.body.name,
        price : req.body.price,
        vendor : req.body.vendor
      })

      data.save((err) => {
        if(err)
          throw err

        //set successful flash message
        req.flash('success','Successfully created data!')

        //redirect to url, not ejs file!
        res.redirect(`/datas/${data.slug}`)
      })
    }

    //show all datas
    function showDatas(req,res) {
      //get all datas
      Data.find({}, (err, datas) => {
         if (err) {
           res.status(404)
           res.send('Datas not found!')
         }

        //return a view with data
        res.render('pages/datas', {
          datas : datas,
          success : req.flash('success')
        })
      })
    }
  //
    //show single data
    function showData (req,res) {
      //get a single data
      Data.findOne({ slug : req.params.slug}, (err,data)=>{
        if(err){
          res.status(404)
          res.send('Data not found!')
        }

        res.render('pages/single', {
          data : data,
          success : req.flash('success')
        })
      })
    }

    //seed database
    function seedDatas (req,res) {
      //create some datas
      const datas = [
        { name: 'iPhone 7s', price: 'Rp 1000', vendor: 'Bekas'},
        { name: 'Samsung Note 7', price: 'Rp 2000', vendor: 'Baru'},
        { name: 'Oppo',  price: 'Rp 3000', vendor: 'Baru'},
        { name: 'Asus Zenfone 3',  price: 'Rp 4000', vendor: 'Bekas'}
      ]

      //use data model to insert
      Data.remove({}, () => {
        for (var i=0;i<datas.length;i++) {
          var newData = new Data(datas[i])
          newData.save()
        }
      })

      //seeded
      res.send('Database seeded!')
    }

  