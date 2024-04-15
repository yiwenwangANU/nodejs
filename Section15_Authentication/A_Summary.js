// 1. Get sign up data from sign up page, check if the email is duplicated
exports.postSignup = (req, res, next) => { // @ some controller
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    User
    .findOne({email: email})
    .then(userDoc => {
      if(userDoc){
        return res.redirect('/signup')
      }
      const user = new User({
        email: email,
        password: password,
        cart: {items: []}
      })
      return user.save()
    })
    .then(result => {
      res.redirect('/login')
    })
    .catch(err => {
      console.log(err)
    })
  };

// 2. Encrypt the password
// npm install --save bcryptjs
const bcrypt = require('bcryptjs'); // @ some controller
bcrypt.hash(password, 12); // @ some controller, hash password 12 rounds, this line of code is asynchronous 

// entire code be like
exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;
    User
    .findOne({email: email})
    .then(userDoc => {
      if(userDoc){
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

  //3. login functionality
  bcrypt.compare(password, user.password) // asy code, return 'true' in then if match
  // entire code
  exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
    .then(user => {
      if(!user){
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
        return res.redirect('/login')
      })
      .catch(err => {
        console.log(err);
        return res.redirect('/login');
      })
    })
  };

  // 4. Protect routes using login information
  exports.getAddProduct = (req, res, next) => {
    if(!req.session.isLoggedIn){
      return res.redirect('/login')
    }
    else{
      return res.render('admin/edit-product', {
                pageTitle: 'Add Product',
                path: '/admin/add-product',
                editing: false,
                isAuthenticated: req.session.isLoggedIn
      });
    }};

//5. Add middleware that can add before all middleware I want to protect
module.exports = (req, res, next) => { // @ middleware/is_auth.js
    if(!req.session.isLoggedIn){
        return res.redirect('/login')
    }
    next();
} 

const isAuth = require('../middleware/is_auth') // @ route 
router.get('/add-product', isAuth, adminController.getAddProduct);

// 6. CSRF attacks, people abuse your session by using fake site to execute intended request which is invisible to user
// ensure people can use your session only when working with your views, session should not be available on other pages
// npm install --save tiny-csrf, cookie-parser
// @ https://www.npmjs.com/package/tiny-csrf
const csurf = require("tiny-csrf");
const cookieParser = require("cookie-parser");  // @ app.js OR 
app.use(cookieParser("cookie-parser-secret"));
app.use( // @ app.js after session
    csurf(
      "123456789iamasecret987654321look", // secret -- must be 32 bits or chars in length
      ["POST"], // the request methods we want CSRF protection for
      ["/detail", /\/detail\.*/i], // any URLs we want to exclude, either as strings or regexp
      [process.env.SITE_URL + "/service-worker.js"]  // any requests from here will not see the token and will not generate a new one
    )
  ); // @ app.js in middleware

  res.render('shop/index', { // @ some controller whose views have post request on it
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    isAuthenticated: req.session.isLoggedIn,
    csrfToken: req.csrfToken
  });

//   <form action="/logout" method="post"> // @ any views than contain post request
//                     <input type="hidden" name="_csrf" value="csrfToken">
//                     <button type="submit">Logout</button>
//   </form>

// 7. Data should include every rendered views
app.use((req, res, next) => { // @ app.js before routing middleware
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  })

// 8. store data(error message) before redirect(which is a new request), use one time use session ==> flash
// npm install --save connect--flash
const flash = require('connect-flash'); //@ app.js
app.use(flash()); // @app.js after session
User.findOne({email: email}) // @ in some controller before the redirect
.then(user => {
  if(!user){
    req.flash('error', 'Invalid email or password');
    return res.redirect('/login')
  }})

exports.getLogin = (req, res, next) => {  // @ in some controller after the redirect
  let errorMessage = req.flash('error');
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: errorMessage.length > 0 ? errorMessage: null
  });
};