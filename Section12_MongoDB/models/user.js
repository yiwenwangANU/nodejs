const { ObjectId } = require("mongodb");
const { getDb } = require("../util/database");

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
    // db.users.updateOne({ _id: ObjectId('6604d4d4770c43f224d14a0e')}, {$pull: {'cart.items': 123}})
    // // .findOne({_id: this._id, 'cart.item.productId': product._id})
    // .then(result => {
    //   return result
    // })
    // .catch(err => console.log(err))

    // if(productIndex!=-1){
    //   return db.collection('users')
    //   .updateOne({_id: this._id}, {$inc: {'cart.item[$productIndex].qty': 1}}) 
    //   .then(result => console.log(result))
    //   .catch(err => console.log(err))
    // }
    // else{
    //   const updatedCart = { item: [{ productId: new ObjectId(product._id), qty: 1 }] }
    //   return db
    //     .collection('users')
    //     .updateOne({ _id: this._id }, { $set: { cart: updatedCart } })

    // }
    
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
