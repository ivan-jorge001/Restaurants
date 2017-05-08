const express = require('express');
const userRouter = express.Router();
const User = require('../models/user-model.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ensure = require("connect-ensure-login");


userRouter.get('/login', ensure.ensureNotLoggedIn('/'), (req, res, next) => {
    res.render('user/user-login-views.ejs');
});

userRouter.post("/login", ensure.ensureNotLoggedIn('/'), passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login'
    }

));






userRouter.get('/signup', ensure.ensureNotLoggedIn('/'), (req, res, next) => {
    res.render('user/user-signup-views.ejs');
});

userRouter.post('/signup', ensure.ensureNotLoggedIn('/'), (req, res, next) => {
    const userName = req.body.usernameValue;
    const password = req.body.passwordValue;
    console.log("first===================================================");
    if (!userName || !password || !req.body.nameValue || !req.body.emailValue || !req.body.lastnameValue) {
        res.render('user/user-signup-views.ejs', {
            errorMessage: ['Please provide a password and a Username'],
            validationerror: undefined
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
                        validationerror: undefined
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
    // if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password) === false) {
    //     res.render('user/user-signup-views.ejs', {
    //         errorMessage: ['Please make sure your password has at least one number one lower case and special characters']
    //     });
    //     return;
    // }
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
        if (err) {
            console.log("itshere");
            next(err);
            return;
        }

        res.redirect('/');
    });
});






module.exports = userRouter;
