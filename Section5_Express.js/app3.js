// Split routing into different files
const express = require('express');
const bodyParser = require('body-parser'); // npm install body-parser --save 
const path = require('path');
const rootDir = require('./util/path');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false})); // use to parse form

//app.use('/admin', adminRoutes); // start with /admin in url
app.use(adminRoutes);
app.use(shopRoutes);

// If not fit any middleware, then use 404 pages
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
})

app.use('/', (req, res, next) => {
    console.log('This always runs!');
    next();
})




app.listen(3000);