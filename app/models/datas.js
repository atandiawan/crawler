const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// create a Schema
const dataSchema = new Schema({
  name: String,
  price: String,
  slug: {
    type: String,
    unique: true
  },
  vendor: String
})

//middleware - make sure slug is created from name
dataSchema.pre('save', function(next){
  this.slug = slugify(this.name)
  next()
})

// function to slugify a name
function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

//create the model
const dataModel = mongoose.model('Data', dataSchema)

//export model
module.exports = dataModel
