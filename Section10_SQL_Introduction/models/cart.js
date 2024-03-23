const fs = require('fs');
const path = require('path');
const db = require('../util/database');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    db.execute('SELECT * FROM cart WHERE cart.productId=?', [id])
    .then(([cartContent, fieldData]) => {
      if(cartContent.length==0){
        return db.execute('INSERT INTO cart (productId, qty, totalPrice) VALUES (?, ?, ?)', [id, 1, productPrice]);
      }
      else{
        return db.execute('UPDATE cart SET qty = qty + 1, totalPrice = totalPrice + ? WHERE ?=?', [productPrice, cartContent[0].productId, id]);
      }
    })
    .catch(err => console.log(err))
  }


  static deleteProduct(id) {
    db.execute('SELECT * FROM cart WHERE cart.productId=?', [id])
    .then(([cartContent, fieldData]) => {
      if(cartContent.length==0){
        return;
      }
      else{
        return db.execute('DELETE FROM cart WHERE productId=?', [id])
      }
    })
  }

  static getCart() {
    return db.execute('SELECT * FROM cart')
  }

  static getCartProduct() {
    return db.execute('SELECT product.id, product.title, product.price, cart.qty FROM product INNER JOIN cart ON product.id=cart.productId')
  }
};
