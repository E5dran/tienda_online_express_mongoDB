const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../app');
const Product = require('../../models/product.model')

describe('Api de products', () => {

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/TiendaOnline');
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });

    describe('GET /api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app)
                .get('/api/products')
                .send();
        });

        it('deberia devolver status 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('deberia devolver la respuesta en formato JSON', () => {
            expect(response.headers['content-type'])
                .toContain('application/json');
        });

        it('deberia devolver un array', () => {
            expect(response.body)
                .toBeInstanceOf(Array);
        });
    });

    describe('POST /api/products', () => {

        let response;
        const newProduct = {
            name: 'Test Product',
            description: 'testing the test',
            category: 'test',
            price: 10,
            available: true,
            stock: 1,
            image: 'url test'
        };

        beforeAll(async () => {
            response = await request(app)
                .post('/api/products')
                .send(newProduct);
        });

        afterAll(async () => {
            await Product.deleteMany({ category: 'test' });
        });

        it('deberia existir la URL en la aplicacion', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto devuelto debería tener _id', () => {
            expect(response.body._id).toBeDefined();
        });

        it('el nombre del producto se ha insertado correctamente', () => {
            expect(response.body.name).toBe(newProduct.name);
        });

    });

    describe('PUT /api/products', () => {

        let response;
        const newProduct = {
            name: 'Test Product',
            description: 'testing the test',
            category: 'test',
            price: 10,
            available: true,
            stock: 1,
            image: 'url test'
        };

        beforeAll(async () => {
            productToEdit = await Product.create(newProduct);
            response = await request(app)
                .put(`/api/products/${productToEdit._id}`)
                .send({ stock: 188, price: 159 })
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(productToEdit._id);
        });

        it('deberia existir la URL en la aplicacion', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('se deberian haber actualizado los datos', () => {
            expect(response.body.stock).toBe(188);
            expect(response.body.price).toBe(159);
        });

    });

    describe('DELETE /api/products', () => {

        let response;
        const newProduct = {
            name: 'Test Product',
            description: 'testing the test',
            category: 'test',
            price: 10,
            available: true,
            stock: 1,
            image: 'url test'
        };

        beforeAll(async () => {
            productToDelete = await Product.create(newProduct);
            response = await request(app)
                .delete(`/api/products/${productToDelete._id}`)
                .send()
        });

        afterAll(async () => {
            await Product.findByIdAndDelete(productToDelete._id);
        });

        it('deberia existir la URL en la aplicacion', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('se deberian haber borrado el producto', async () => {
            const p = await Product.findById(productToDelete._id);
            expect(p).toBeNull();
        });

    });

});