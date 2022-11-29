const router = require('express').Router();

const Client = require('../../models/client.model');
const Product = require('../../models/product.model');

router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().populate('products');
        res.json(clients);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.get('/:clientId/product/:productId', async (req, res) => {
    try {
        const { clientId, productId } = req.params;
        const client = await Client.findById(clientId);
        client.products.push(productId);
        await client.save();
        res.json({ message: 'Product added' });
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        res.json(newClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.put('/:clientId', async (req, res) => {
    try {
        const newClient = await Client.findByIdAndUpdate(req.params.clientId, req.body, { new: true });
        res.json(newClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:clientId', async (req, res) => {
    try {
        const newClient = await Client.findByIdAndDelete(req.params.clientId);
        res.json(newClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

router.delete('/:clientId/product/:productId', async (req, res) => {
    try {
        const { clientId, productId } = req.params;
        const client = await Client.findById(clientId);
        const pos = client.products.indexOf(productId);

        client.products.splice(pos, 1);
        await client.save();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.json({ fatal: error.message });
    }
});

module.exports = router;