'use strict';
module.exports = function(sequelize, DataTypes) {
  var barangs = sequelize.define('barangs', {
    nama_barang: DataTypes.STRING,
    harga_barang: DataTypes.INTEGER,
    vendor_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return barangs;
};
