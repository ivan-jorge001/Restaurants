const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
      required:[ true,'You forgot to put a name']
    },
    lastname: {
        type: String,
        required: [ true,'You forgot to put a Lastname']
    },
    username: {
        type: String,
        required:[ true,'You forgot to put a username']
    },
    email: {
        type: String,
        required: [ true,'You forgot to put a email']
    },
    password: {
        type: String,
        match:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
        required: [ true,'Please make sure your password has at least one number one lower case and special characters']
    }
},{timestamps:true});
const Users = mongoose.model('Users', userSchema);

module.exports = Users;
