const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/user');
const { sendEmail } = require('../.aws/sendMail');
const generateRandomBytes = require('../util/random');

exports.getLogin = (req, res, next) => {
  const errorMessage = req.flash('error');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: errorMessage.length > 0 ? errorMessage : null
  });
};

exports.getSignup = (req, res, next) => {
  const errorMessage = req.flash('error');
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
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
    if (!password || !confirmPassword || !email) {
      req.flash('error', 'username and password are required!');
      return res.redirect('/signup');
    }
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
      sendEmail(email, 'Test Email', 'Hello from AWS!');
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

exports.getReset = (req, res, next) => {
  const errorMessage = req.flash('error');
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Password Reset',
    errorMessage: errorMessage.length > 0 ? errorMessage : null
  });
}

exports.postReset = async (req, res, next) => {
  try{
    const user = await User.findOne({'email': req.body.email});
    if(!user) {
      req.flash('error', 'No account with that email found!');
      return res.redirect('/reset');
    }else{
      const token = await generateRandomBytes(32);
      user.resetToken = token;
      user.resetTokenExpiration = Date.now() + 3600000;
      await user.save();
      res.redirect('/');
      sendEmail(req.body.email, 'Password Reset', `
      <p> You request a password reset</p>
      <p> Click <a href="http://localhost:3000/reset/${token}">this</a> link to reset the password. </p>
      `);
    }  
  }
  catch(err){
    console.log(err);
    req.flash('error', 'Something goes wrong. Please signup again.');
    return res.redirect('/reset');
  }
}

exports.getNewPassword = async (req, res, next) => {
  try{
    const token = req.params.token;
    const errorMessage = req.flash('error');
    const user = await User.findOne({'resetToken': token, 'resetTokenExpiration': {$gt: Date.now()}});
    if(!user){
      req.flash('error', 'No account with that email found!');
      return res.redirect('/');
    }else{
      res.render('auth/new-password', {
        path: '/new-password ',
        pageTitle: 'New Password',
        userId: user._id.toString(),
        passwordToken: token,
        errorMessage: errorMessage.length > 0 ? errorMessage : null
      });
    }
  }
  catch(err){
    console.log(err);
    req.flash('error', 'Something goes wrong. Please signup again.');
    return res.redirect('/reset');
  }
}

exports.postNewPassword = async (req, res, next) => {
  try{
    const {userId, password, passwordToken} = req.body;
    const user = await User.findOne({'_id': userId, 'resetToken': passwordToken, 'resetTokenExpiration': {$gt: Date.now()}});
    if(!user){
      req.flash('error', 'Something goes wrong. Please try again.');
      return res.redirect(req.get('Referrer') || '/');
    }else{
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
      user.passwordToken = undefined;
      user.passwordTokenExpiration = undefined;
      await user.save();
      res.redirect('/login');
    }
  }
  catch(err){
    console.log(err);
    req.flash('error', 'Something goes wrong. Please try again.');
    res.redirect(req.get('Referrer') || '/');
  }
}