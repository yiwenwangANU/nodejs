const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product');
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const imgUrl = req.body.imgUrl;
    const detail = req.body.detail;

    const product = new Product(title, price, imgUrl, detail);
    product.save();

    res.redirect('/');
}