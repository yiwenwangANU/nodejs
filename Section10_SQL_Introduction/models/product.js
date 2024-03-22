const fs = require('fs');
const path = require('path');
const db = require('../util/database');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO product (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
     [this.title, this.price, this.description, this.imageUrl]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM product WHERE id=?', [id]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM product');
  }

  static findById(id) {
    return db.execute('SELECT * FROM product WHERE id=id');
  }
};
