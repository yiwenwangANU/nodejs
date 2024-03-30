const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");
let db

module.exports = class User{
  constructor(_id, username, email, cart){
    this._id = _id;
    this.username = username;
    this.email = email;
    this.cart = cart;
  }

  save(){
    db = getDb()
    if(!this._id){
      return db
      .collection('users')
      .insertOne({username: this.username, email: this.email, cart: this.cart})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      return db
      .collection('users')
      .updateOne({_id: this._id}, {$set: {username: this.username, email: this.email, cart: this.cart}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
  }

  addToCart(productId){
    db = getDb()
    const index = this.cart.items.findIndex(i => i.productId.toString() === productId)
    console.log('id is ' + productId)
    console.log('index is ' + index)
    if(index!=-1){
      console.log('route 1')
      return db
      .collection('users')
      .updateOne({_id: this._id, 'cart.items.productId': new ObjectId(productId)}, {$inc: {'cart.items.$.qty':1}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      console.log('route 2')
      return db
      .collection('users')
      .updateOne({_id: this._id}, {$push: {'cart.items': {productId: new ObjectId(productId), qty: 1}}})
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
      return products.map(product => {
        const cartItem = {...product, qty: this.cart.items.find(i => i.productId.toString() === product._id.toString()).qty}
        return cartItem 
      })
    })
    .catch(err => console.log(err))
  }

  removeFromCart(productId){
    db = getDb()
    const productNumber = this.cart.items.find(i => i.productId.toString() === productId).qty
    if(productNumber > 1){
      return db
      .collection('users')
      .updateOne({_id: this._id, 'cart.items.productId': new ObjectId(productId)}, {$inc: {'cart.items.$.qty':-1}})
      .then(result => console.log(result))
      .catch(err => console.log(err))
    }
    else{
      return db
      .collection('users')
      .updateOne({_id: this._id}, {$pull: {'cart.items': {productId: new ObjectId(productId)}}})
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
  }

  getOrders(){
    db = getDb()
    return db
      .collection('orders')
      .find({'user._id': this._id})
      .toArray()
      .then(result => {
        return result
      })
      .catch(err => console.log(err))
  }

  static findById(userId){
    db = getDb()
    return db
    .collection('users')
    .findOne({_id: new ObjectId(userId)})
    .then(user => {
      return user
    })
    .catch(err => console.log(err))
  }
}