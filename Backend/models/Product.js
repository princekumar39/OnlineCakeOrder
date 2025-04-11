const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    subcategory: String,
    price: Number,
    image: String,
    description: String
}, { timestamps: true });

module.export = mongoose.model("Product", productSchema);