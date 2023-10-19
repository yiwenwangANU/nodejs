const express = require('express');
const adminRoute = require('./routes/admin');
const shopRoute = require('./routes/shop');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoute);
app.use(shopRoute);

app.listen(3000);