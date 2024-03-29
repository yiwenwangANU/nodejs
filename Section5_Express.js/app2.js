//Routing in Express + parsing incoming requests
const express = require('express');
const bodyParser = require('body-parser'); // npm install body-parser --save 

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
})

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
})

app.post('/product', (req, res, next) => { // filtering all the post request
    console.log(req.body);
    res.redirect('/') //instead of res.statusCode = 302; res.setHeader('Location', '/');
})
app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
})

app.listen(3000);