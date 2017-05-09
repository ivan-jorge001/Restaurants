const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const grad = new Schema({

      date : {type: Date, default: Date.now},
      grade : { type: String },
      score : { type: Number }

});
const grades = mongoose.model('grades',grad);

module.exports = grades;
