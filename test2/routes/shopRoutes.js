const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/', shopController.getShopPage);
router.get('/products', shopController.getProductsPage);
router.get('/products/:productId', shopController.getProductDetail);
router.get('/cart', shopController.getCartPage);
router.post('/cart', shopController.postCart);
router.get('/orders', shopController.getOrdersPage);
module.exports = router;