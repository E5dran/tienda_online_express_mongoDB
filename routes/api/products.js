const router = require('express').Router();

const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/available', async (req, res) => {
    try {
        const products = await Product.find({ available: true });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/category/:category', async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/min/:price', async (req, res) => {
    try {
        const products = await Product.find({
            price: { $gt: req.params.price }
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/min/:min/max/:max', async (req, res) => {
    try {
        const { min, max } = req.params
        const products = await Product.find({
            price: { $gt: min, $lt: max }
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/stock/:stock', async (req, res) => {
    try {
        const { min, max } = req.params
        const products = await Product.find({
            stock: { $gt: req.params.stock },
            available: true
        });
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:productID', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productID);
        res.json(product);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:productID', async (req, res) => {
    try {
        const newProduct = await Product.findByIdAndUpdate(req.params.productID, req.body, { new: true });
        res.json(newProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:productID', async (req, res) => {
    try {
        const newProduct = await Product.findByIdAndDelete(req.params.productID);
        res.json(newProduct);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;