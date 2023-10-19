const express = require('express');
const adminController = require('../controllers/admin');

const route = express.Router();

route.get('/add-product', adminController.getAddProduct);

module.exports = route;