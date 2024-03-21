const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    editing: false,
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId;
  const editing = req.query.edit;
  Product.getProductFromId(productId, product => {
    res.render('admin/edit-product', {
      product: product,
      editing: editing,
      pageTitle: 'Add Product',
      path: '/admin/add-product'
    })
  })
  
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const productId = req.body.productId;
  Product.updateProduct(productId, title, imageUrl, description, price);
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  const price = req.body.price;
  Cart.removeFromCart(productId, price);
  Product.deleteProduct(productId);
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
