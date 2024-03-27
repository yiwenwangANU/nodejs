const {ObjectId} = require('mongodb')

module.exports = class Product{
  constructor(title, price, description, imageUrl, _id){
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = _id ? new ObjectId(_id) : _id;
  }
}