var fs = require('fs')
var cheerio = require('cheerio')
var request = require('request')
var csv = require('fast-csv')

//declaring containers
let itemArray = []
let inputToCSV = ""

//function to write a new file
let createCSV = function (input){
  fs.writeFile("result.csv", input,'utf8')
}

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
  url: 'http://www.lazada.co.id/'
}, function(err, response, body){
  if(err) return console.error(err);
  let $ = cheerio.load(body)

  //part you want to scrape
  $('.c-product-item__info').each(function(){
    //push object into array;
    var $price = $(this).find('.c-product-item__price').first()
    var priceValue = ($price.html()).trim();
    var priceTitle = $(this).find('.c-product-item__title').first().html()
    itemArray.push(new Item(priceTitle, priceValue))
  })
  for (let idx in itemArray){
    //to not make a new row
    itemArray[idx]._title = itemArray[idx]._title.replace(/\r/ig," ")
    itemArray[idx]._title = itemArray[idx]._title.replace(/\n/ig," ")

    //to make comma a different char so that it will not make a new column
    inputToCSV = inputToCSV + itemArray[idx]._title.replace(/,/ig, "-")
    inputToCSV = inputToCSV + ', ' + itemArray[idx]._price + '\n'
  }

  //to modify special chars
  inputToCSV = inputToCSV.replace(/&apos;/ig, "'")
  inputToCSV = inputToCSV.replace(/&#x2019;/ig, "'")
  inputToCSV = inputToCSV.replace(/&quot;/ig, "\"")
  inputToCSV = inputToCSV.replace(/&amp;/ig, "&")
  inputToCSV = inputToCSV.replace(/&#x2013;/ig, "-")
  inputToCSV = inputToCSV.replace(/&#xE8;/ig, "e")


  console.log(itemArray)
  createCSV(inputToCSV)
})


//how to append to a new row
