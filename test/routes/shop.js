const express = require('express');

const route = express.Router();
const shopController = require('../controllers/shopController');

route.get('/', shopController.getMainPage);

module.exports = route;