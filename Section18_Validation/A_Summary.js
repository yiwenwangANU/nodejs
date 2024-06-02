// 1. Use third party package to do the validation(check the user input is valid data) 
// npm install express-validator

// 2. In the router, create validation logic 
const { check, body } = require('express-validator'); //@router
router.post('/signup', [
    check('email')
        .isEmail().withMessage('Please enter a valid email!')
        .trim()
        .custom(async (email, { req }) => {     // add custom async validation
            const user = await User.findOne({ email: email });
            if (user) {
                throw new Error('E-mail already exists!');
            }
        }),
    check('password', 'Please enter a password with only numbers and texts and at least 5 characters')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(), // two check with one error message
    body('confirmPassword')
        .trim()
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            // Indicates the success of this synchronous custom validator
            return true;
        }),
], authController.postSignup);

// 3. In the controller, get validation error, if error, return with res.render()
const { validationResult } = require('express-validator'); //@controller
const errors = validationResult(req); //get validation error from the request
if(!errors.isEmpty()){
    return res.status(422).render('auth/signup', {
        pageTitle: 'Signup',
        path: '/auth/signup',
        errorMessage: errors.array()[0].msg
      });
}

// In the controller/ejs view, keep the user input before res.render
res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/auth/signup',
    errorMessage: errorMessage.len == 0 ? null: errorMessage,
    oldInput: {email: '', password: ''}
  });
// 4. Sanitizing the input(trim, normalize)
router.post('/login', [ // @router
    check('email', 'Email or password is wrong!')
        .isEmail()
        .trim()
        .normalizeEmail(),
    body('password', 'Email or password is wrong!')
    .isLength({ min: 4 })
    .isAlphanumeric()
    .trim()
], authController.postLogin);

// 5. Add validation to login page, add-product and edit-product page