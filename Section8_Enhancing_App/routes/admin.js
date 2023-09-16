const express = require('express');
const path = require('path');
const AdminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', AdminController.getAddProduct);
router.get('/products', AdminController.getProducts);
router.post('/add-product', AdminController.postAddProduct);


module.exports = router;
//exports.products = products; 