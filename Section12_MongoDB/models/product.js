const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
let db;
class Product{
  constructor(title, price, description, imageUrl){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save(){
    db = getDb();
    return db.collection('products').insertOne(this)
    .then(result => console.log(result))
    .catch(err => console.log(err));
  }

  static fetchAll(){
    db = getDb();
    return db.collection('products').find().toArray()
    .then(products => {
      return products
    })
    .catch(err => console.log(err))
  }
}

module.exports = Product;
