const router = require("express").Router();
const {User, validate } = require("../models/user");
const bcrypt = require("bcrypt")
const Token = require('../models/token')
const sendEmail = require('../utils/sendEmail');
const crypto = require("crypto");
const otpGenerator = require('otp-generator')
//const { generateOTP } = require("../utils/sendEmail");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			userId: user._id,
            token:crypto.randomInt(100000, 999999),
			//token: otpGenerator.generate(6, { digits:true, upperCaseAlphabets: false, specialChars: false }),
		}).save();
		const url = `Verification Code : ${token.token}`;
        // const url = token.token;
		await sendEmail(user.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
            console.log(url);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports= router;