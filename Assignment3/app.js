const express = require('express');
const path = require('path');
const rootRoute = require('./routes/root');
const userRoute = require('./routes/users');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoute);
app.use(rootRoute);


app.listen(3000);