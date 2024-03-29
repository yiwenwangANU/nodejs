const Product = require('../model/product');

exports.getProductPage = (req, res, next) => {
    res.render('add-product', {pagetitle: 'add-product', path: '/admin/add-product'});
}

exports.addProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.img_url;
    const price = req.body.price;
    const detail = req.body.detail;
    console.log(req.body);
    const product = new Product(title, imageUrl, price, detail);
    product.save();
    res.redirect('/');
}