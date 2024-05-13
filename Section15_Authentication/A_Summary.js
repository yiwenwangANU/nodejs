// Part1. Using connect-flash to flash the error message.
// req.flash is a one time session, it will auto-delete after retrieviong. 
// npm install --save connect--flash
const flash = require('connect-flash'); //@ app.js
app.use(flash()); // @app.js after session

User.findOne({email: email}) // @ in some controller before the redirect
.then(user => {
  if(!user){
    req.flash('error', 'Invalid email or password'); // store the flash info
    return res.redirect('/login')
  }})

exports.getLogin = (req, res, next) => {  // @ in some controller after the redirect
  let errorMessage = req.flash('error'); // get the flash info
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: errorMessage.length > 0 ? errorMessage: null
  });
};

// Part2. Create sign up page, create postSignup in controller using async/await.
// 1. Check if the email is duplicated, change the User model by removing name and adding password
// 2. Encrypt the password
// npm install --save bcryptjs
const bcrypt = require('bcryptjs'); // @ some controller
bcrypt.hash(password, 12); // @ some controller, hash password 12 rounds, this line of code is asynchronous 

// entire code be like
exports.postSignup = async (req, res, next) => {
  try{
    const {email, password, confirmPassword} = req.body;

    const user = await User.findOne({'email': email});
    if(user){
      req.flash('error', 'Email already exist');
      return res.redirect('/signup');
    }
  
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email: email,
      password: hashedPassword,
      cart: {items: []}
    })
    await newUser.save();
    res.redirect('/login');
  }
  catch(err){
    console.log(err);
    req.flash('error', 'Something went wrong. Please try again.');
    res.redirect('/signup')
  }
  
};

  //Part3. Create login page, create postLogin in controller.
  // compare passwords using bcrypt.compare()
  bcrypt.compare(password, user.password) // asy code, return 'true' in then if match
  // entire code
  exports.postLogin = async (req, res, next) => {
    try{
      const {email, password} = req.body;

      const user = await User.findOne({'email': email});
      
      if(!user){
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }
    
      const doMatch = await bcrypt.compare(password, user.password);
      if(!doMatch){
        req.flash('error', 'Invalid email or password');
        return res.redirect('/login');
      }else{
        req.session.isLoggedIn = true;
        req.session.user = user;
        await req.session.save();
        res.redirect('/');
      }
    }
    catch(err){
      console.log(err);
      req.flash('error', 'Something went wrong. Please try again.');
      res.redirect('/login');
    }
  };


  // Ensure the session was saved before redirect
      req.session.isLoggedIn = true;
      req.session.userId = user._id;
      await req.session.save(err => {
        if(err){
          console.log(err);
        }
        res.redirect('/');
      });
// use session to store user id instead of user object
      app.use((req, res, next) => {
        if (!req.session.userId) {
          return next();
        }
        User.findById(req.session.userId)
          .then(user => {
            req.user = user;
            next();
          })
          .catch(err => console.log(err));
      });
  // Part4. Protect routes using login information
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

// Add middleware that can add before all middleware I want to protect
module.exports = (req, res, next) => { // @ middleware/is_auth.js
    if(!req.session.isLoggedIn){
        return res.redirect('/login')
    }
    next();
} 

const isAuth = require('../middleware/is_auth') // @ route 
router.get('/add-product', isAuth, adminController.getAddProduct);

// Part5. CSRF attacks, people abuse your session by using fake site to execute intended request which is invisible to user
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
//                     <input type="hidden" name="_csrf" value="<%= csrfToken %>">
//                     <button type="submit">Logout</button>
//   </form>

// 7. Data should include every rendered views
app.use((req, res, next) => { // @ app.js before routing middleware
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
  })

