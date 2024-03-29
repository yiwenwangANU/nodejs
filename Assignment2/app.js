const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
    console.log('This always run!');
    next();
});

app.use('/users', (req, res, next) => {
    res.send('<h1>Users</h1>');
})
app.use('/', (req, res, next) => {
    res.send('<h1>Response!</h1>');
})
app.listen(3000);