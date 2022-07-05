const nodemailer = require('nodemailer');

module.exports = generateOTP = () => {
    let otp = ''
    for(let i =0; i <= 3; i++)
    {
        const randVal = Math.round(Math.round()*9);
        otp = otp + randVal;
    }
    return otp;
}

module.exports = async(email, subject, text) => {
    try {
        //Allen
        
        

            // res.set({
            //     'Content-Type': 'application/vnd.apple.pkpass',
            //     'Content-disposition': `attachment; filename=${passName}.pkpass`,
            // });

            // stream.pipe(res);

            const chunks = [];

            stream.on('data', chunk => {
                chunks.push(chunk);
            });
            //End Allen


        const transporter = nodemailer.createTransport(
            {
                host:process.env.HOST,
                service:process.env.SERVICE,
                post: Number(process.env.EMAIL_PORT),
                secure:Boolean(process.env.SECURE),
                auth:{
                    user:process.env.USER,
                    pass:process.env.PASS
                }
            }
        );

        await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        });
        console.log('Email Sent Successfully')
    } catch (error) {
        console.log('Email not sent');
        console.log(error);
      
    }
}