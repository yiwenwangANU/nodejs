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
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.getProcuctById(productId, product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: 'Details',
      path: '/products'
    })
  });
  
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
  Cart.getCartProducts(cartProducts => {
    res.render('shop/cart', {
      cartProducts: cartProducts,
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

exports.postAddToCart = (req, res, next) => {
  const productId = req.body.productId;
  const price = req.body.price;
  Cart.addToCart(productId, price);
  res.redirect('/products');
}
