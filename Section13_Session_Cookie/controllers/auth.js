exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
      });
}

exports.postLogin = (req, res, next) => {
    req.session.isLoggedIn = true
    res.redirect('/')
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        // cannot access session here
        console.log(err)
        res.redirect('/')
      })
}