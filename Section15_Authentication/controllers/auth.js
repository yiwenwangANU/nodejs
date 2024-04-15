const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
  let errorMessage = req.flash('error');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: errorMessage.length > 0 ? errorMessage: null
  });
};

exports.getSignup = (req, res, next) => {
  let errorMessage = req.flash('error');
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: errorMessage.length > 0 ? errorMessage: null
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email: email})
  .then(user => {
    if(!user){
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login')
    }
    bcrypt
    .compare(password, user.password)
    .then(doMatch => {
      if(doMatch){
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save(err => {
          console.log(err);
          res.redirect('/');
        });
      }
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login')
    })
    .catch(err => {
      console.log(err);
      return res.redirect('/login');
    })
  })
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;
  User
  .findOne({email: email})
  .then(userDoc => {
    if(userDoc){
      req.flash('error', 'Email already exist');
      return res.redirect('/signup')
    }
    return bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        name: email,
        email: email,
        password: hashedPassword,
        cart: {items: []}
      })
      return user
      .save()
      .then(result => {
        res.redirect('/login')
      })
    })
  })
  .catch(err => {
    console.log(err)
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
