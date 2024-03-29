const express = require('express');
const bodyParser = require('body-parser')
const shopRoutes = require('./routes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(shopRoutes);
app.use('/admin', adminRoutes);
app.listen(3000);