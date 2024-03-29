const Product = require('../model/product')

exports.getMainPage = (req, res, next) => {
    Product.fetchAll((products) => {
        console.log(products);
        res.render('main', {products: products, path: '/', pagetitle: 'index'});
})    
}
    