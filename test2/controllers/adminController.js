const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {path:'/admin/add-product'})
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const img_url = req.body.img_url;
    const price = req.body.price;
    const detail = req.body.detail;
    const product = new Product(title, img_url, price, detail);
    product.save();
    res.redirect('/');
}
exports.getAdminProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product', {productList: products, path:'/admin/product'});
    })
    
}
