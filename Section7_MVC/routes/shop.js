const express = require('express');
const path = require('path');
const productsController = require('../controllers/products');

const router = express.Router();
const adminData = require('./admin');

// router.get('/', (req, res, next) => {
//     console.log(adminData.products);
//     res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
// })

router.get('/', productsController.getProducts);

module.exports = router