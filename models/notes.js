// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// Do we need user based fields here?
// Getting only the results for that user
// Archive Field needed and route to mark as Archive

// create a schema
var noteSchema = new Schema({
  subject: {
      type: String,
      required: true
      //limit to 25 characters
  },
  memo: {
      type: String,
      required: false
      //limit to 100 characters
  },
  memolong: {
      type: String,
      required: false
      //limit to 1000 characters
  },
  ///this part helps to define to the coach what the note/document is about - all documents must fulfill a similar path
  //need core tag?
  tags: {
      type: String,
      required: false
      //multi tags needed?
  },
  picture: {
    type: String, //will be replaced by some bit
    required: false
    //learn how to binary store the picture
  }


  //ratings???
  //here a person should enter


//dates will be there by default
}, {
  timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Notes = mongoose.model('Note', noteSchema);

// make this available to our Node applications
module.exports = Notes;
