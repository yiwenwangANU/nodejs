const Product = require('../models/product');



exports.getProducts = (req, res, next) => {
    // Parse products to templete as pros
    Product.fetchAll((products) => {
        res.render('shop/product-list', {pros: products, 
            pageTitle: 'All Products', 
            path: '/products', 
    });
    
        
    }); // Use the default templete engine to render shop.pug
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            pros: products, 
            pageTitle: 'Shop', 
            path: '/', 
        });   
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}