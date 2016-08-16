var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var stats = require('../models/stats');

var statRouter = express.Router();
statRouter.use(bodyParser.json());

statRouter.route('/')
.get(function (req, res, next) {
    stats.find({}, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})

.post(function (req, res, next) {
    stats.create(req.body, function (err, stat) {
        //if (err) throw err;
        if (err) { return next(err); }
        console.log('stat created man!');
        var id = stat._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the stat with id: ' + id);
    });
})

.delete(function (req, res, next) {
    stats.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

statRouter.route('/:statId')
.get(function (req, res, next) {
    stats.findById(req.params.statId, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})

.put(function (req, res, next) {
    stats.findByIdAndUpdate(req.params.statId, {
        $set: req.body
    }, {
        new: true
    }, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})

.delete(function (req, res, next) {
    stats.findByIdAndRemove(req.params.statId, function (err, resp) {
       if (err) throw err;
        res.json(resp);
    });
});


statRouter.route('/value/:value')
.get(function (req, res, next) {
//    stats.find({ "name": req.params.value}, function (err, stat) {
    stats.find({ "value": {$gt: req.params.value}}, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})


statRouter.route('/value/:value/:name')
.get(function (req, res, next) {
    stats.find({ "name": req.params.name}, function (err, stat) {
//    stats.find({ "value": {$gt: req.params.value}}, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})




module.exports = statRouter;
