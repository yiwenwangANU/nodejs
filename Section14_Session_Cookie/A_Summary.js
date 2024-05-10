// Part 1 Cookies
// 1. Create login page, knowing that req.loggedIn is not shared accrossed the different request, but just live in the 
// request where it was created, we need cookies to store data accross the requests
// 2. How to set login Cookies
exports.postLogin = (req, res, next) => { //@ some controller
    res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; HTTPOnly')
    res.redirect('/')
}
// 3. How to get Cookies
console.log(req.get('Cookie')) // @ some controller
// 4. User can manipulate the value of cookies, not secure for login information, so using Cookie(in user browser) to store
// id(with hash) of Session, and store session in database instead

// Part 2 Sessions
// 1. third party package for session 
// npm install express-session

// 2. initialize the session middleware 
const session = require('express-session') //@ app.js
app.use( //@ app.js
    session({secret: 'some long string value', resave: false, saveUninitialized:false})
)

// 3. use session to store information
exports.postLogin = (req, res, next) => { // @ some controller
    req.session.isLoggedIn = true
    res.redirect('/')
}

// 4. check session information
console.log(req.session.isLoggedIn) // @ some controller

// Part 3 Store session in Mongodb find on https://github.com/expressjs/session
// 1. npm install --save connect-mongodb-session
const MongoDBStore = require('connect-mongodb-session')(session) // @ app.js

const store = new MongoDBStore({ // @ app.js
    uri: CONNECTION_STRING,
    collection: 'sessions'
  });

app.use( // @ app.js before routes middleware
    session({secret: 'some long string value', resave: false, saveUninitialized:false, store: store})
)

// 11. delete cookie(delete on session on db)
exports.postLogout = (req, res, next) => { // @ some controller
    req.session.destroy(err => {
        // cannot access session here
        console.log(err)
        res.redirect('/')
      })
}