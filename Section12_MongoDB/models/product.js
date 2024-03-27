const {ObjectId} = require('mongodb');
const { getDb } = require('../util/database');
let db;
module.exports = class Product{
  constructor(title, price, description, imageUrl, _id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id ? new ObjectId(_id) : null;
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
}