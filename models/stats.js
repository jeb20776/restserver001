// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var statSchema = new Schema({
  name: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: false
  },
  value: {
      type: Number,
      required: false
  }



}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Stats = mongoose.model('Stat', statSchema);

// make this available to our Node applications
module.exports = Stats;
