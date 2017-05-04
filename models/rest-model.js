const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Grades = require("./grades-model.js");

const rest = new Schema({

    name:{
        type: String,
        required: [true, 'Please enter the Name']
    },
    address: {
        building: {
            type: String,
            required: [true, 'Please enter the Building Number']
        },
        coord: [Number, Number],
        street: {
            type: String,
            required: [true, 'Please enter the Street']
        },
        zipcode: {
            type: String,
            required: [true, 'Please enter the zipcode']
        }
    },
    borough: {
        type: String,
        required: [true, 'Please enter the Borough']
    },
    cuisine: {
        type: String,
        required: [true, 'Please enter the cuisine type']
    },
    grades: [Grades.schema]
});

const restaurants = mongoose.model('restaurants', rest);
module.exports = restaurants;
