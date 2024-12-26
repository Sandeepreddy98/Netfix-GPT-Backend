const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        minLength : 2
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        validate : (email) => {
            if(!validator.isEmail(email)){
                throw new Error('Enter valid email.')
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,
        validate :(password) => {
            if(!validator.isStrongPassword(password,{
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
              })){
                throw new Error("Please enter strong password");
            }
        }
    }
},{timestamps : true})

const User = mongoose.model('User',userSchema)

module.exports = User