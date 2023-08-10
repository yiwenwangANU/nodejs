const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

// Using ejs as the templete engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(shopRoutes);
app.use('/admin', adminRoutes.routes);

app.use('/', (req, res, next) => {
    res.render('404', {pageTitle: 404, path: '/404', });
});

app.listen(3000);