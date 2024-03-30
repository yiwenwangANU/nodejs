const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { connectToDb } = require('./util/database');
const errorController = require('./controllers/error');
const User = require('./models/user')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
connectToDb((err) => {
  if(!err){
      console.log('Database Connected');
      app.listen(3000);
  }    
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('660509e4770c43f224d14a0f')
  .then(user => {
    req.user = new User(user._id, user.username, user.email, user.cart)
    next()
  })
  .catch(err => console.log(err))
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);