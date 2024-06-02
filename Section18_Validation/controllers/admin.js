const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    errorMessage: null
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  });
  product
    .save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const errorMessage = req.flash('error');
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product,
        errorMessage: errorMessage.length > 0 ? errorMessage : null
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = async (req, res, next) => {
  try{
    const {productId, title, price, imageUrl, description} = req.body;
    const product = await Product.findById(productId);
    if(!product){
      req.flash('error', 'Something goes wrong. Please try again.');
      return res.redirect(req.get('Referrer') || '/');
    }
    if(product.userId.toString() !== req.user._id.toString()){
      return res.redirect('/');
    }else{
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      await product.save();
      console.log('UPDATED PRODUCT!');
      res.redirect('/admin/products');
    }
  }
  catch(err){
    console.log(err);
    req.flash('error', 'Something goes wrong. Please try again.');
    res.redirect(req.get('Referrer') || '/');
  }
  
};

exports.getProducts = (req, res, next) => {
  Product.find({userId: req.user._id})
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteOne({_id: prodId, userId: req.user._id})
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
