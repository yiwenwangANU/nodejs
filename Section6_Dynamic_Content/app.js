const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
// const { engine } = require('express-handlebars'); // express-handlebars

const app = express();
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

// Using pug as the templete engine
// app.set('view engine', 'pug');  
// app.set('views', 'views');

// Using express-handlebars as the templete engine
// app.engine('handlebars', engine({layoutsDir: 'views/layouts', defaultLayout: 'main-layout'}));
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// Using ejs as the templete engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.use(shopRoutes);
app.use('/admin', adminRoutes.routes);

app.use('/', (req, res, next) => {
    res.status(404).render('404', {pageTitle: 404, path: "/404"});
});

app.listen(3000);