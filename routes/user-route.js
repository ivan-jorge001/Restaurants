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
console.log("first===================================================");
    if (!userName || !password) {
        res.render('user/user-signup-views.ejs', {
            errorMessage: ['Please provide a password and a Username'],
              validationerror:undefined
        });
        return;
    }
    console.log("second===================================================");

    if (userName) {
        User.findOne({
                username: userName
            }, {
                username: 1
            },
            (err, theUser) => {
                if (err) {
                    next(err);
                    return;
                }
                if (theUser) {
                  res.render('user/user-signup-views.ejs', {
                      errorMessage: ['Please select another User name yours is already on use'],
                      validationerror:undefined
                  });
                  return;
                }
            });
    }

    if (password.length < 6 || password.lenght > 33) {
        res.render('user/user-signup-views.ejs', {
            errorMessage: ['Please provie a password beteween 6-32 characters']
        });
        return;
    }
    console.log("go in the saving the user");
    const salt = bcrypt.genSaltSync();
    const hashPass = bcrypt.hashSync(password, salt);
    const newUser = new User({
        name: req.body.nameValue,
        lastname: req.body.lastnameValue,
        email: req.body.emailValue,
        username: userName,
        password: hashPass,
    });
    newUser.save((err) => {
      console.log(`this is the err ======================================================= ${err}`);
        if (err) {
          console.log(`this is the newUser.errors ======================================================= ${newUser.error}`);
            res.render('user/user-signup-views.ejs', {
                validationErrors: newUser.errors,
                errorMessage:undefined
            });

        }

        res.redirect('/');
    });
});






module.exports = userRouter;
