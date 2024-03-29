const express = require('express');
const bodyParser = require('body-parser');

const mainRoute = require('./routes/main');
const userRoute = require('./routes/users');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(mainRoute.router);
app.use(userRoute);

app.listen(3000);