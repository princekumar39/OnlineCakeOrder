const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: Number
        }
    ],
    status: { type: String, default: "Processing" },
    shippingAddress: String
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
