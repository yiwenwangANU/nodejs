const express = require('express');
const userData = require('./main');

const router = express.Router();

router.get('/users', (req, res, next) => {
    const userList = userData.userList;
    console.log(userList);
    //res.render('users');
    res.render('users', {users: userList});
})

module.exports = router;