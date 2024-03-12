const fs = require('fs');
const { maxHeaderSize } = require('http');
const path = require('path');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id = Math.random().toString();
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static getProcuctById(id, cb){
    getProductsFromFile(products => {
      const matchedProduct = products.find(product => product.id === id);
      cb(matchedProduct);
    })
  }

  static updateProduct(id, title, imageUrl, description, price){
    getProductsFromFile(products => {
      const index = products.findIndex(product => product.id === id);
      if(index!=-1){
        let updatedProducts = [...products];
        updatedProducts[index].title = title;
        updatedProducts[index].imageUrl = imageUrl;
        updatedProducts[index].description = description;
        updatedProducts[index].price = price;
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        })
      }
    })
  }
};
