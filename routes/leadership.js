var express = require('express');
var bodyParser = require('body-parser');

  //var morgan = require('morgan');
  //var app = express();

  var leadership = express.Router();
  leadership.use(bodyParser.json());

//key code here to export the dishRouter from the module

  module.exports = leadership;

  leadership.route('/')
  .all(function(req,res,next) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        next();
      })

      .get(function(req,res,next){
          res.end('Will send all the leaders to you!');
        })

        .post(function(req, res, next){
          res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
        })

        .delete(function(req, res, next){
          res.end('Deleting all leaders');
        });

    leadership.route('/:leaderID')
        .all(function(req,res,next) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          next();
        })

        .get(function(req,res,next){
          res.end('Will send details of the leader: ' + req.params.leaderID +' to you!');
        })

        .put(function(req, res, next){
          res.write('Updating the leader: ' + req.params.leaderID + '\n');
          res.end('Will update the leader: ' + req.body.name +
              ' with details: ' + req.body.description);
            })

            .delete(function(req, res, next){
              res.end('Deleting leader: ' + req.params.dishId);
            });
