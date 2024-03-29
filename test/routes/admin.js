const express = require('express');
const adminController = require('../controllers/adminController');
const route = express.Router();

route.get('/add-product', adminController.getProductPage);

route.post('/add-product', adminController.addProduct);

module.exports = route;