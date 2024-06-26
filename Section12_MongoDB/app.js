const path = require('path');
const {connectToDb} = require('./util/database');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

connectToDb((err) => {
  if(!err){
      console.log('Database Connected');
      app.listen(3000);
  }    
})

app.use((req, res, next) => {
  User.findById('660509e4770c43f224d14a0f')
  .then(user => {
    req.user = new User(user.username, user.email, user.cart, user._id)
    next()
  })
  .catch(err => console.log(err))
  
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
