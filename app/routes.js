//create new express router
const express = require('express'),
  router = express.Router()
  mainController = require('./controllers/main.controller')
  dataController = require('./controllers/data.controller')

//export router
module.exports = router

//define routes

//main routes
router.get('/', mainController.showHome)

//seed datas
router.get('/datas/seed', dataController.seedDatas)

//show all datas
router.get('/datas', dataController.showDatas)

//create data
router.get('/datas/add', dataController.showAdd)
router.post('/datas/add', dataController.processAdd)

//edit data
router.get('/datas/:slug/edit', dataController.showEdit)
router.post('/datas/:slug', dataController.processEdit)

//delete data
router.get('/datas/:slug/delete', dataController.deleteData)

//show single data
router.get('/datas/:slug', dataController.showData)

//import data
router.get('/datas/import/elevenia', dataController.importElevenia)
router.get('/datas/import/lazada', dataController.importLazada)