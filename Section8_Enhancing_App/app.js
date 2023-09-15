const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');

// Using ejs as the templete engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(shopRoutes);
app.use('/admin', adminRoutes);

app.use('/', errorController.get404);

app.listen(3000);