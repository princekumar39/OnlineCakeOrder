const express = require("express");
const Product = require("../models/Product.js");
const router = express.Router();

// Add Product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All / Filter Products
router.get("/", async (req, res) => {
    const { category, subcategory, minPrice, maxPrice } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (subcategory) filter.subcategory = subcategory;
    if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };
    try {
        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(404).json({ error: "Product not found" });
    }
});

module.exports = router;
