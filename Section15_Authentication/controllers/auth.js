const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  const errorMessage = req.flash('error');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    errorMessage: errorMessage.length > 0 ? errorMessage : null
  });
};

exports.getSignup = (req, res, next) => {
  const errorMessage = req.flash('error');
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: errorMessage.length > 0 ? errorMessage : null
  });
};

exports.postLogin = async (req, res, next) => {
  try{
    const {email, password} = req.body;
    const user = await User.findOne({'email': email});
    if(!user){
      req.flash('error', 'Email and password does not match!');
      return res.redirect('/login');
    }
  
    const doMatch = await bcrypt.compare(password, user.password);
    if(!doMatch){
      req.flash('error', 'Email and password does not match!');
      return res.redirect('/login');
    }else{
      req.session.isLoggedIn = true;
      req.session.userId = user._id;
      req.session.save(err => {
        if(err){
          console.log(err);
        }
        res.redirect('/');
      })
    }
  }
  catch(err) {
    console.log(err);
    req.flash('error', 'Something goes wrong. Please login again.');
    return res.redirect('/login');
  }
};

exports.postSignup = async (req, res, next) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      req.flash('error', 'Passwords do not match!');
      return res.redirect('/signup');
    }
    const user = await User.findOne({ 'email': email });
    if (user) {
      req.flash('error', 'Email has already been used!');
      return res.redirect('/signup');
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      })
      await newUser.save();
      return res.redirect('/login');
    }
  }
  catch (err) {
    console.log(err);
    req.flash('error', 'Something goes wrong. Please signup again.');
    return res.redirect('/signup');
  }

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  })
};
