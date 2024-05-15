// Part1. Create get password reset page
// Create reset.ejs view, getReset in controller and the route, then add link in login.ejs to reset password
<div class="centered">
    <a href="/reset">Reset Password</a>
</div>

//Part2. Post password reset, after we submit the email, we want to receive a email with a link to reset the password
// 1. Update user model add token (not required)
// resetToken: String,
// resetTokenExpiration: Date

// 2. using crypto(native package) to generate random bytes
const crypto = require('crypto');


function generateRandomBytes(size) {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(size, (err, buffer) => {
            if(err) reject(err);
            else resolve(buffer.toString('hex'));
        })
    })
}

module.exports = generateRandomBytes;

// 3. create postReset in controller, create token => store token in user => send email with token
exports.postReset = async (req, res, next) => { //@controller
    try{
      const user = await User.findOne({'email': req.body.email});
      if(!user) {
        req.flash('error', 'No account with that email found!');
        return res.redirect('/reset');
      }else{
        const token = await generateRandomBytes(32);
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        await user.save();
        res.redirect('/');
        sendEmail(req.body.email, 'Password Reset', `
        <p> You request a password reset</p>
        <p> Click <a href="http://localhost:3000/reset/${token}">this</a> link to reset the password. </p>
        `);
      }  
    }
    catch(err){
      console.log(err);
      req.flash('error', 'Something goes wrong. Please signup again.');
      return res.redirect('/reset');
    }
  }

// 4. create getNewPassword in controller, use token in the url to locate the user, parse userId and token as hidden input
exports.getNewPassword = async (req, res, next) => { //@controller
    try{
      const token = req.params.token;
      const errorMessage = req.flash('error');
      const user = await User.findOne({'resetToken': token, 'resetTokenExpiration': {$gt: Date.now()}});
      if(!user){
        req.flash('error', 'No account with that email found!');
        return res.redirect('/');
      }else{
        res.render('auth/new-password', {
          path: '/new-password ',
          pageTitle: 'New Password',
          userId: user._id.toString(),
          passwordToken: token,
          errorMessage: errorMessage.length > 0 ? errorMessage : null
        });
      }
    }
    catch(err){
      console.log(err);
      req.flash('error', 'Something goes wrong. Please signup again.');
      return res.redirect('/reset');
    }
  }

// 5. Create postNewPassword controller, use userId, token to locate the user in db, change the password
  exports.postNewPassword = async (req, res, next) => {
    try{
      const {userId, password, passwordToken} = req.body;
      const user = await User.findOne({'_id': userId, 'resetToken': passwordToken, 'resetTokenExpiration': {$gt: Date.now()}});
      if(!user){
        req.flash('error', 'Something goes wrong. Please try again.');
        return res.redirect(req.get('Referrer') || '/');
      }else{
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.passwordToken = undefined;
        user.passwordTokenExpiration = undefined;
        await user.save();
        res.redirect('/login');
      }
    }
    catch(err){
      console.log(err);
      req.flash('error', 'Something goes wrong. Please try again.');
      res.redirect(req.get('Referrer') || '/');
    }
  }

// Part3. User cannot edit/delete products that was not created by them
// only show products created by req.user in admin/products
exports.getProducts = (req, res, next) => { //@controller
    Product.find({userId: req.user._id})
}
// in postEditProduct
if(product.userId.toString() !== req.user._id.toString()){ //@controller
    return res.redirect('/');
  }
// in postDeleteProduct
Product.deleteOne({_id: prodId, userId: req.user._id})//@controller
