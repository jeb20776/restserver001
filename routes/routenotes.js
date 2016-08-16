var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var notes = require('../models/notes');

var noteRouter = express.Router();
noteRouter.use(bodyParser.json());

noteRouter.route('/')
.get(function (req, res, next) {
    notes.find({}, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})

.post(function (req, res, next) {
    notes.create(req.body, function (err, stat) {
        //if (err) throw err;
        if (err) { return next(err); }
        console.log('note created man!');
        var id = stat._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the note with id: ' + id);
    });
})

.delete(function (req, res, next) {
    notes.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

noteRouter.route('/:noteID')
.get(function (req, res, next) {
    notes.findById(req.params.noteID, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})

.put(function (req, res, next) {
    notes.findByIdAndUpdate(req.params.noteID, {
        $set: req.body
    }, {
        new: true
    }, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})

.delete(function (req, res, next) {
    notes.findByIdAndRemove(req.params.noteID, function (err, resp) {
       if (err) throw err;
        res.json(resp);
    });
});


noteRouter.route('/tags/:tagID')
.get(function (req, res, next) {
//    stats.find({ "name": req.params.value}, function (err, stat) {
    notes.find({ "tags": req.params.tagID}, function (err, stat) {
        if (err) throw err;
        res.json(stat);
    });
})



module.exports = noteRouter;
