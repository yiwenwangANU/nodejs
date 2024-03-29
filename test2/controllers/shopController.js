const Product = require('../models/product');

exports.getShopPage = (req, res, next) => {
    const productList = Product.fetchAll(productList => {
        res.render('public/index', {productList: productList, path:'/'});       
    });
}
exports.getProductsPage = (req, res, next) => {
    const productList = Product.fetchAll(productList => {
        res.render('public/product-list', {productList: productList, path:'/products'});
    });
}
exports.getCartPage = (req, res, next) => {
    const productList = Product.fetchAll(productList => {
        res.render('public/cart', {productList: productList, path:'/cart'});
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    res.redirect('/cart');
}
exports.getOrdersPage = (req, res, next) => {
    const productList = Product.fetchAll(productList => {
        res.render('public/orders', {productList: productList, path:'/orders'});
    });
}
exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;
    Product.getProductFromId(productId, product => {
        res.render('public/product-detail', {product: product, path:'/products'});
    })
}