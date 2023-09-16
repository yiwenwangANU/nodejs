const express = require('express');
const path = require('path');
const shopController = require('../controllers/shop');

const router = express.Router();
const adminData = require('./admin');

// router.get('/', (req, res, next) => {
//     console.log(adminData.products);
//     res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
// })

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);
module.exports = router