const express = require('express');
const restRouter = express.Router();
const RestModel = require('../models/rest-model.js');


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




restRouter.get('/restaurants/:id', (req, res, next) => {
    const restId = req.params.id;
    RestModel.find(restId, (err, theRest) => {
      if (err) {
        next(err);
        return;
      }
      res.render('Restaurants-views/Rest-details-views.ejs',
    rest:theRest);
    });
});
module.exports = restRouter;
