const express = require('express');
const shopController = require('../controllers/shop');

const route = express.Router();

route.get('/', shopController.getIndex);

module.exports = route;