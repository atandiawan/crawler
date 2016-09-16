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

// model.barangs.create({nama_barang: "barang_percobaan", harga_barang: 700000})
