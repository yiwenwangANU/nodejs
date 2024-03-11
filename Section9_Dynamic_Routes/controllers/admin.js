const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    editing: false,
    productId: null,
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
  Product.getProductById(productId, product => {
    res.render('admin/edit-product', {
      editing: true,
      product: product,
      pageTitle: 'Update Product',
      path: '/admin/edit-product'
    });
  })
  
}

exports.postAddProduct = (req, res, next) => {
  const productId = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  if(productId == null){
    const product = new Product(title, imageUrl, description, price);
    product.save();
  }
  else{
    Product.updateProduct(productId, title, imageUrl, description, price);
  }
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
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
