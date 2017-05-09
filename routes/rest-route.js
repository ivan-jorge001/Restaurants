const express = require('express');
const restRouter = express.Router();
const RestModel = require('../models/rest-model.js');
const gradeModel = require('../models/grades-model.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const ensure = require("connect-ensure-login");


restRouter.get('/add-restaurants', ensure.ensureLoggedIn('/'), (req, res, next) => {
    res.render('user/add-rest-view.ejs');
});

restRouter.post('/add-restaurants', ensure.ensureLoggedIn('/'), (req, res, next) => {
    const newrest = new RestModel({
name: req.body.nameValue,
'address.building': req.body.buildingValue,
'address.street': req.body.streetValue,
'address.zipcode': req.body.boroughValue,
borough: req.body.zipcodeValue,
cuisine: req.body.cuisineValue
    });
    newrest.save((err)=>{
      if (err) {
        console.log('you have and error while saving object');
        next(err);
        return;
      }
      res.redirect("/");
    });
});


restRouter.get('/restaurants', (req, res, next) => {
    RestModel.find().limit(15).exec((err, theRest) => {
        if (err) {
            next(err);
            return;
        }

        res.render('Restaurants-views/Restaurants-views.ejs', {
            rest: theRest
        });
    });
});
restRouter.get('/restaurants/search/:cate', (req, res, next) => {
    console.log("it got inside the get");

    const type = req.params.cate;
    res.render('Restaurants-views/rest-search-views.ejs', {
        type: type,
        rest: undefined
    });
});

restRouter.get('/login', (req, res, next) => {
    res.render('Restaurants-views/rest-login-views.ejs');
});

restRouter.post('/restaurants/search/:cate', (req, res, next) => {
    console.log("it got inside the post");
    const searchBy = req.params.cate;
    console.log(`searchBy ============================= ${searchBy}`);
    if (!req.body.searchValue) {
        res.render('Restaurants-views/rest-search-views.ejs');
    }
    console.log(`searchValue ============================= ${req.body.searchValue}`);
    const searchTerm = new RegExp(req.body.searchValue, "i");
    // const filter = { [searchBy]: searchTerm };
    const filter = {};
    filter[searchBy] = searchTerm;

    RestModel.find(filter, (err, theRest) => {
        if (err) {
            next(err);
            return;
        }
        console.log(`=================>${theRest[0]}`);
        res.render('Restaurants-views/rest-search-views.ejs', {
            rest: theRest,
            type: searchBy
        });
    });

});



restRouter.get('/restaurants/:id', (req, res, next) => {
    const restId = req.params.id;
    RestModel.findById(restId, (err, theRest) => {
        if (err) {
            next(err);
            return;
        }
        res.render('Restaurants-views/rest-details-views.ejs', {
            rest: theRest
        });
    });
});
module.exports = restRouter;
