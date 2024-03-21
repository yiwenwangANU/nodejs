const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  Product.getProductFromId(productId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Details',
      path: '/products'
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCartProductDetails(cartProductDetails => {
    //[...{product:product,qty:4}]
    res.render('shop/cart', {
      cartProductDetails: cartProductDetails,
      path: '/cart',
      pageTitle: 'Your Cart'
    });

  })

    

};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  const price = req.body.price;
  Cart.addToCart(productId, price);
  res.redirect('/');
}

exports.postRemoveFromCart = (req, res, next) => {
  const productId = req.body.productId;
  const price = req.body.price;
  Cart.removeFromCart(productId, price);
  res.redirect('/cart');
}