const mongoose = require('mongoose');
const { Schema } = mongoose;

let productSchema = new Schema(
  {
    name: String,
    price: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('Product', productSchema, 'products');