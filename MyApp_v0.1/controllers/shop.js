const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fetchAll(productList => {
        res.render('shop/index', {productList: productList});
    })
    
}