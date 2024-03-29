const path = require('path');
const express = require('express');
const rootDir = require('../util/path');

const router = express.Router();
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '/shop.html')); // __dirname give the path to the file it was used, ../ means go up one level
})

module.exports = router;