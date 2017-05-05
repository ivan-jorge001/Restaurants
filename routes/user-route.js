const express = require('express');
const userRouter = express.Router();
const User = require('../models/user-model.js');
const bcrypt = require('bcrypt');


userRouter.get('/signup', (req, res, next) => {
    res.render('user/user-signup-views.ejs');
});

userRouter.post('/signup', (req, res, next) => {
    const userName = req.body.usernameValue;
    const password = req.body.passwordValue;

    if (!username || !password) {
        res.render('user/user-signup-views.ejs', {
            errorMessage: 'Please provide a password and a Username'
        });
    }
    if (userName) {
        userModel.findOne({
                username: userName
            }, {
                username: 1
            },
            (err, theUser) => {
                if (err) {
                    next(err);
                    return;
                }
                res.render('user/user-signup-views.ejs', {
                    errorMessage: 'Please select another User name yours is already on use'
                });
            });
    }

    if (password.length < 6 || password.lenght > 33) {
      res.render('user/user-signup-views.ejs', {
          errorMessage: 'Please provie a password beteween 6-32 characters'
      });
      return;
    }
const salt = bcrypt.genSaltSync();
const hashPass = bcrypt.hashSync(password,salt);
const newUser = new User({
  name:req.body.nameValue,
  lastname:req.body.lastnameValue,
  email:req.body.emailValue,
  username:userName,
  password:password,
});
    res.redirect('user/user-signup-views.ejs');
});






module.exports = userRouter;
