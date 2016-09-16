var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
var csv = require('fast-csv')
var model = require("./models/index")


class Generic{
  static convertHargatoInteger(harga){
    let onlyNumber = harga.substring(3)
    let number = onlyNumber.replace(/\./g,"")
    let correctNumber = parseInt(number)
    return correctNumber
  }

  static cleanUpSpecialChar(nama_barang){
    nama_barang = nama_barang.replace(/&apos;/ig, "'")
    nama_barang = nama_barang.replace(/&#x2019;/ig, "'")
    nama_barang = nama_barang.replace(/&quot;/ig, "\"")
    nama_barang = nama_barang.replace(/&amp;/ig, "&")
    nama_barang = nama_barang.replace(/&#x2013;/ig, "-")
    nama_barang = nama_barang.replace(/&#xE8;/ig, "e")
    nama_barang = nama_barang.replace(/\r/ig," ")
    nama_barang = nama_barang.replace(/\n/ig," ")
    return nama_barang
  }
}

let itemArray = []

class Item {
  constructor(title, price){
    this._title = title;
    this._price = price;
  }
}

//run the scrape
request({
  method: 'GET',

  //URL you want to scrape
  url: 'http://www.lazada.co.id/beli-handphone/'
}, function(err, response, body){
  if(err) return console.error(err);
  let $ = cheerio.load(body)

  //part you want to scrape
  $('.product-card__description').each(function(){
    //push object into array;
    var $price = $(this).find('.product-card__price').first()
    var priceValue = ($price.html()).trim();
    var priceTitle = $(this).find('.product-card__name.big').first().html()
    itemArray.push(new Item(priceTitle, priceValue))
  })
  for (let idx in itemArray){
    model.barangs.create({nama_barang: Generic.cleanUpSpecialChar(itemArray[idx]._title), harga_barang: Generic.convertHargatoInteger(itemArray[idx]._price), vendor_name: "Lazada"})
  }
})






//how to append to a new row
