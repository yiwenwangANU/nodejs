const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const is_auth = require('../middleware/is_auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', is_auth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', is_auth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', is_auth, [
    body('title')
    .isString()
    .isLength({min: 3})
    .trim(),
    body('price')
    .isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
],adminController.postAddProduct);

router.get('/edit-product/:productId', is_auth, adminController.getEditProduct);

router.post('/edit-product', is_auth, adminController.postEditProduct);

router.post('/delete-product', is_auth, adminController.postDeleteProduct);

module.exports = router;
