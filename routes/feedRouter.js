var express = require('express');
var mongoose = require('mongoose');
var Feedbacks = require('../models/feedbacks');
var Verify = require('./verify');

var feedRouter = express.Router();

feedRouter.route('/')

.get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Feedbacks.find({})
        .populate('postedBy')
        .exec(function(err, feed) {
            if (err) next(err);
            res.json(feed);
        });
})

.post(Verify.verifyOrdinaryUser, function(req, res, next) {
    Feedbacks.create(req.body, function(err, feed) {
        if (err) next(err);
        feed.postedBy = req.decoded._id;
        feed.save(function(err, feed) {
            if (err) next(err);
            res.json(feed);
            console.log('feedback Added!');

        });

    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    Feedbacks.remove({}, function(err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});


module.exports = feedRouter;