var express = require('express');
var mongoose = require('mongoose');
var Favorites = require('../models/favorites');
var Verify = require('./verify');

var favRouter = express.Router();

favRouter.route('/')

.all(Verify.verifyOrdinaryUser)

.get(function(req, res, next) {
    Favorites.findOne({
        postedBy: {
            _id: req.decoded._id
        }
    })
        .populate('postedBy')
        .populate('dishes')
        .exec(function(err, fav) {
            if (err) next(err);
            res.json(fav);
        });
})

.post(function(req, res, next) {

    Favorites.findOne({
        postedBy: {
            _id: req.decoded._id
        }
    }, function(err, fav) {
        if (err) next(err);
        if (fav === null) {

            Favorites.create({}, function(err, fav) {
                if (err) next(err);
                fav.postedBy = req.decoded._id;
                fav.dishes.push(req.body._id); //dish id
                fav.save(function(err, fav) {
                    if (err) next(err);
                    console.log('fav dish added!');
                    res.json({
                        "exist": false
                    });
                });

            });

        } else {

            Favorites.findOne({
                postedBy: {
                    _id: req.decoded._id
                }
            }, function(err, fav) {
                if (err) next(err);
                var index = fav.dishes.indexOf(req.body._id);
                if (index == -1) {
                    fav.dishes.push(req.body._id); //dish id
                    fav.save(function(err, fav) {
                        if (err) next(err);
                        console.log('another fav dish added!');
                        res.json({
                            "exist": false
                        });
                    });
                } else {
                    console.log('dish already added!');
                    res.json({
                        "exist": true
                    });
                }

            });

        }
    });
})

.delete(function(req, res, next) {
    Favorites.findOneAndRemove({
        postedBy: {
            _id: req.decoded._id
        }
    }, function(err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

favRouter.route('/:dishId')
    .all(Verify.verifyOrdinaryUser)

.delete(function(req, res, next) {
    Favorites.findOne({
        postedBy: {
            _id: req.decoded._id
        }
    }, function(err, fav) {
        if (err) next(err);
        var index = fav.dishes.indexOf(req.params.dishId);
        if (index > -1) {
            fav.dishes.splice(index, 1);
            fav.save(function(err, resp) {
                if (err) next(err);
                res.json(resp);
                console.log('dish deleted');
            });
        } else {
            var err = new Error('dish doesn' + "'" + 't exist!');
            err.status = 403;
            return next(err);
        }
    });

});



module.exports = favRouter;