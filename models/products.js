const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, default: 0 },
    description: { type: String, default: '' }
  }, {
    versionKey: false
  });

module.exports = mongoose.model('Product', productSchema);
