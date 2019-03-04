/* 
Common file for common function in express
*/
const md5 = require('md5');
const nodemailer = require('nodemailer');
//const hbs = require('nodemailer-express-handlebars');

const encodeMD5 = string => {
    return md5(string);
}


const sendingEmail = data =>{

    let transporter = nodemailer.createTransport(
        {
            host: 'smtp.gmail.com',
            port: 25,
            secure: false,
            auth: {
              user: 'manish1986200821@gmail.com',
              pass: 'manish@123'
            },
            logger: true,
            debug: false // include SMTP traffic in the logs
        },       
      );

      var mailOptions = {
        from: 'support@buy2shop.com',
        to: data.to,
        subject: 'Your order cashback payment is send on your paytm number.',
        html: data.html,
        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = {   
    encodeMD5,
    sendingEmail
};