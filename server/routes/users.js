const router = require("express").Router();
const {User, validate } = require("../models/user");
const bcrypt = require("bcrypt")
const Token = require('../models/token')
const sendEmail = require('../utils/sendEmail');
//const { generateOTP } = require("../utils/sendEmail");

router.post('/', async (req, res) => {
    try {
        const {error} = validate(req.body);

        if(error)
            return res.status(400).send({message:error.details[0].message});
            

        let user = await User.findOne({email: req.body.email})
        if(user)
        return res.status(409).send({message:"Email Already Exists"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        user = await new User({...req.body, password:hashPassword}).save();

        const OTP = generateOTP();

        const token = await new Token({
            userId: user._id,
            token: OTP,
        }).save();
        await sendEmail(user.email, 'Verification Code', token)
        res.status(201).send({message:"An email sent to your account. Please verify"});
        
        
    } catch (error) {
       
        console.log(error)
        res.status(500).send({message:"Internal Server Error"});
       
    }
})

module.exports= router;