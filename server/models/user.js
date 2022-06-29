const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
   firstName: {type:String, required: true},
   lastName: {type:String, required: true},
   email: {type:String, required: true},
   password: {type:String, required: true} 
})

userSchema.methods.generateAuthToken = function  (){
    const token = jwt.sign(
        {_id: this._id},
        process.jwt.JWTPRIVATEKEY,
        {expiresIn:"7d"}
        )
        return token
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        firstName: Joi.String.require().label("First Name"),
        lastName: Joi.String.require().label("Last Name"),
        email: Joi.String.email().label("Email"),
        password: Joi.String.passwordComplexity().label("Password")
    });

    return schema.valid(data)
}

module.exports = {User, validate}