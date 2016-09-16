var model = require("./models/index")
var repl = require('repl')

class Database{
  static displayBarang(){
    model.barangs.findAll().then(function(barang){
      for (let i in barang){
        console.log(barang[i].id," Nama Barang: ",barang[i].nama_barang.substring(0, 20), " , Harga Barang: RP", barang[i].harga_barang, " Vendor: ", barang[i].vendor_name);
      }
    })
  }

  static addBarang(nama, harga, vendor){
    model.barangs.create({nama_barang: nama, harga_barang: harga, vendor_name: vendor})
  }

  static removeBarang(id){
    model.barangs.destroy({where: {id: id}})
  }
}

var replServer = repl.start({prompt: ">"})
replServer.context.Database = Database
