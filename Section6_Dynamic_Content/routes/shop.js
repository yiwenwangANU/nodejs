const express = require('express');
const path = require('path');

const router = express.Router();
const adminData = require('./admin');

// router.get('/', (req, res, next) => {
//     console.log(adminData.products);
//     res.sendFile(path.join(__dirname, '..', 'views', 'main.html'));
// })

router.get('/', (req, res, next) => {
    const products = adminData.products;
    // Parse products to templete as pros
    res.render('shop', {pros: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        
    }); // Use the default templete engine to render shop.pug
})

module.exports = router