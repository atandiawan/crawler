var model = require("./models/index")

class Database{
  static seeAll(){
    model.barangs.findAll().then(function(barang){
      for (let i in barang){
        console.log(barang[i].id," Nama Barang: ",barang[i].nama_barang.substring(0, 20), " , Harga Barang: RP", barang[i].harga_barang, " Vendor: ", barang[i].vendor_name);
      }
    })
  }
}

Database.seeAll()
