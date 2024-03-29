const express = require('express');

const router = express.Router();
const userList = [];

router.get('/', (req, res, next) => {
    res.render('main');
})

router.post('/', (req, res, next) => {
    console.log(req.body);
    userList.push({username: req.body.username});
    res.redirect('/users');
})

exports.router = router;
exports.userList = userList;