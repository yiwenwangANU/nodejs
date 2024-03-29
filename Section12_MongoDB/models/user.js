const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/database");

let db;
module.exports = class User {
  constructor(username, email, cart, userId) {
    this.username = username;
    this.email = email;
    this.cart = cart; // {item: []}
    this._id = userId ? new ObjectId(userId) : null;
  }

  save() {
    db = getDb()
    return db.collection('users')
      .insertOne(this)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }

  addToCart(product) {
    db = getDb()
    const cartProductIndex = this.cart.items.findIndex(cartProduct => cartProduct.productId.toString() === product._id.toString())
    if(cartProductIndex!=-1){
      return db.collection('users')
      .updateOne({_id: this._id, 'cart.items.productId': product._id}, {$inc: {'cart.items.$.qty': 1}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      return db.collection('users')
      .updateOne({_id: this._id}, {$push: {'cart.items': {productId: product._id, qty:1}}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    
  }

  getCart(){
    db = getDb()
    const productIds = this.cart.items.map(i => i.productId)
    return db
    .collection('products')
    .find({_id: {$in: productIds}})
    .toArray()
    .then(products => {
      return products.map(p => {
        return {...p, qty: this.cart.items.find(i => {
          return i.productId.toString() === p._id.toString()
        }).qty
      }
      })
    })
    .catch(err => console.log(err))
  }

  deleteCart(productId){
    const itemNumber = this.cart.items.find(i => i.productId.toString() === productId).qty
    db = getDb()
    if(itemNumber>1){
      return db.collection('users')
      .updateOne({_id: this._id, 'cart.items.productId': new ObjectId(productId)}, {$inc: {'cart.items.$.qty': -1}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      return db.collection('users')
      .updateOne({_id: this._id}, {$pull: {'cart.items':{productId: new ObjectId(productId)}}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  }

  static findById(userId) {
    db = getDb()
    return db.collection('users')
      .findOne({ _id: new ObjectId(userId) })
      .then(result => {
        return result
      })
      .catch(err => console.log(err))
  }
}
