const express = require('express');
const { check, body } = require('express-validator');
const User = require('../models/user');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/login', authController.postLogin);

router.post('/signup', [
    body('email')
    .isEmail().withMessage('Please enter a valid email!')
    .trim()
    .normalizeEmail()
    .custom(async (email, {req}) => {
        const user = await User.findOne({email: email});
        if(user){
            next(new Error('Email already exist!'));
        }
    }).withMessage('Email already exist!'),
    body('password', 'Please enter a password with only numbers and texts and at least 4 characters')
    .isAlphanumeric()
    .isLength({min: 4})
    .trim(),
    body('confirmPassword')
    .custom((confirmPassword, {req}) => {
        if(confirmPassword !== req.body.password){
            throw new Error('Password confirmation does not match password!');
        }
        return true
    })
    .trim()

], authController.postSignup);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;