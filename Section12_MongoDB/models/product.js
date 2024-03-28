const {ObjectId} = require('mongodb');
const { getDb } = require('../util/database');
let db;
module.exports = class Product{
  constructor(title, price, description, imageUrl, userId, productId){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId ? new ObjectId(userId) : null;
    this._id = productId ? new ObjectId(productId) : null;
  }
  save(){
    db = getDb()
    return db.collection('products')
    .insertOne(this)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
  static fetchAll(){
    db = getDb();
    return db.collection('products')
    .find()
    .toArray()
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
  }
  static findById(productId){
    db = getDb()
    return db.collection('products')
    .findOne({_id: new ObjectId(productId)})
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
  }
  static updateById(title, price, description, imageUrl, productId){
    db = getDb()
    return db.collection('products')
    .updateOne({_id: new ObjectId(productId)}, {$set: {
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl
    }})
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
  }

  static deleteById(productId){
    db = getDb()
    db.collection('products')
    .deleteOne({_id: new ObjectId(productId)})
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
  }
}