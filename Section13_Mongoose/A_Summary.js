//1. Connect to database
const mongoose = require('mongoose');
const {CONNECTION_STRING} = require('./util/pass');

mongoose
  .connect(
    CONNECTION_STRING, {
      useNewUrlParser: true,    // Use the new URL string parser
      useUnifiedTopology: true, // Use the new connection management engine
    }
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

//2. Create class with mongoose schema
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', productSchema);

//3. Create model (mongoose define the save() method for us)
const product = new Product({title: title, price: price, description: description, imageUrl: imageUrl});

//4. Get products from the database by find() method which is another static method
//5. Get single product from the database by findById() method
//6. save() method update the existing product when called
//7. findByIdAndRemove() is the build-in deleteById method
//8. Create User model 
cart: {
  items: [{
      productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
      }, 
      quantity: {
          type: Number,
          required: true
      }}]
}
//9. Use .populate('userId') after find() to get all information from id in another model, or .populate('userId', 'name') for 
// parts of the data
// Use .select('title price -_id') to retrieve part of the data
Product
    .find()
    .populate('userId')
    .then(products => {})
// without find we need
req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(products => {})
// 10. Add custom method in model schema
userSchema.methods.addToCart = function() {
    
}
// 11. use {...XXX._doc} to copy objects
return {product: {...product.productId._doc}}

// 12. find() with conditions
Order.find({'user.userId': req.user._id})