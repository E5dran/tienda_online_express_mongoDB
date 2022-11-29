const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    description: String,
    category: String,
    price: Number,
    available: Boolean,
    stock: Number,
    image: String
});

module.exports = model('product', productSchema);