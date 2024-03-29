// npm init
// npm install express --save (install in production mode)
// "start": "nodemon app.js" in script

// const http = require('http');
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next(); // Allow the request to continue to next middleware
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    // Use next() to go to the next middleware or send the response
    res.send('<h1>Hello from Express!</h1>'); // instead of res.setHeader + res.write
});

app.listen(3000); // instead of const server = http.createServer(); server.listen(3000);