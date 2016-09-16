let convertHargatoInteger = function(harga){
  let onlyNumber = harga.substring(3)
  let number = onlyNumber.replace(/\./g,"")
  let correctNumber = parseInt(number)
  return correctNumber + 1
}
