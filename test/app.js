const express = require('express');
const path = require('path');
const mainRoute = require('./routes/shop');
const adminRoute = require('./routes/admin');
const bodyParser = require('body-parser');
const app = express();



app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(mainRoute);
app.use('/admin', adminRoute);
app.listen(3000);