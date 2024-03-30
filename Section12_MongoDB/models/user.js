const { ObjectId } = require('mongodb');
const {getDb} = require('../util/database')
let db;

module.exports = class User{
  constructor(username, email, cart, _id){
    this.username = username
    this.email = email
    this.cart = cart
    this._id = _id 
  }

  save(){
    db = getDb()
    return db
    .collection('users')
    .insertOne({username: this.username, email: this.email, cart: this.cart})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  addToCart(productId){
    db = getDb()
    return db
    .collection('users')
    .findOne({_id: this._id, 'cart.items.productId': new ObjectId(productId)})
    .then(result => {
      if(result){
        return db
        .collection('users')
        .updateOne({_id: this._id, 'cart.items.productId': new ObjectId(productId)}, {$inc: {'cart.items.$.qty': 1}})
        .then(result => console.log(result))
        .catch(err => console.log(err))
      }
      else{
        return db
        .collection('users')
        .updateOne({_id: this._id}, {$push: {'cart.items': {productId: new ObjectId(productId), qty: 1}}})
        .then(result => console.log(result))
        .catch(err => console.log(err))
      }
    })    
  }

  getCart(){
    db = getDb()
    const productIds = this.cart.items.map(i => i.productId)
    console.log(productIds)
    return db
    .collection('products')
    .find({_id: {$in: productIds}})
    .toArray()
    .then(result => {
      const cartItems = result.map(i => {
        return {...i, qty: this.cart.items.find(item => item.productId.toString() === i._id.toString()).qty}
      })
      return cartItems
    })
    .catch(err => console.log(err))
  }

  deleteProduct(productId){
    db = getDb()
    const productNumber = this.cart.items.find(item => item.productId.toString() === productId).qty
    if(productNumber < 2){
      return db
      .collection('users')
      .updateOne({_id: this._id}, {$pull: {'cart.items': {productId: new ObjectId(productId)}}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      return db
      .collection('users')
      .updateOne({_id: this._id, 'cart.items.productId': new ObjectId(productId)}, {$inc: {'cart.items.$.qty':-1}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  }

  resetCart(){
    db = getDb()
    return db
    .collection('users')
    .updateOne({_id: this._id}, {$set: {'cart.items': []}})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  addToOrder(){
    db = getDb()
    return this.getCart()
    .then(cart => {
      return db
      .collection('orders')
      .insertOne({items: cart, user: {_id: this._id, username: this.username}})
      .then(result => {
        console.log(result)
        this.resetCart()
      })
      .catch(err => console.log(err))
    })
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  getOrders(){
    db = getDb()
    return db
    .collection('orders')
    .find({'user._id': this._id})
    .toArray()
    .then(orders => {
      return orders
    })
    .catch(err => console.log(err))
  }

  static findById(userId){
    db = getDb()
    return db
    .collection('users')
    .findOne({_id: new ObjectId(userId)})
    .then(result => {
      return result
    })
    .catch(err => console.log(err))
  }
}
