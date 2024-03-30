const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');
let db
module.exports = class Product{
  constructor(title, price, description, imageUrl, userId, _id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId
    this._id = _id ? new ObjectId(_id) : null
  }

  save(){
    db = getDb()
    if(!this._id){
      return db
      .collection('products')
      .insertOne({title: this.title, price: this.price, description: this.description, imageUrl: this.imageUrl, userId: this.userId})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      return db
      .collection('products')
      .updateOne({_id: this._id}, {$set: {title: this.title, price: this.price, description: this.description, imageUrl: this.imageUrl, userId: this.userId}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  }

  static fetchAll(){
    db = getDb()
    return db
    .collection('products')
    .find()
    .toArray()
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
  }

  static findById(productId){
    db = getDb()
    return db
    .collection('products')
    .findOne({_id: new ObjectId(productId)})
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
  }

  static deleteById(productId){
    db = getDb()
    return db
    .collection('products')
    .deleteOne({_id: new ObjectId(productId)})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
}