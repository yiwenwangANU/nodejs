// 1. any variables within a single request just live in that request
// 2. Set Cookies
exports.postLogin = (req, res, next) => { //@ some controller
    res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10; HTTPOnly')
    res.redirect('/')
}
// 3. Use Cookies
console.log(req.get('Cookie')) // @ some controller
// 4. user can manipulate the value of cookies

// 5. using Cookie(in user browser) to store id(with hash) of Session, and store session in database

// 6. third party package for session 
// npm install express-session

// 7. initialize the session middleware 
const session = require('express-session') //@ app.js
app.use( //@ app.js
    session({secret: 'some long string value', resave: false, saveUninitialized:false})
)

// 8. use session to store information
exports.postLogin = (req, res, next) => { // @ some controller
    req.session.isLoggedIn = true
    res.redirect('/')
}

// 9. check session information
console.log(req.session.isLoggedIn) // @ some controller

// 10. store session in Mongodb find on https://github.com/expressjs/session
// npm install --save connect-mongodb-session
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