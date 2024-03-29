const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const router = express.Router();

router.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    
})

router.post('/add-product', (req, res, next) => { // filtering all the post request
    console.log(req.body);
    res.redirect('/') //instead of res.statusCode = 302; res.setHeader('Location', '/');
})

module.exports = router;