const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/dealstacker'
);

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pricetracker888@gmail.com',
    pass: 'price8858'
  }
});
const sendEmail = (price,subject,email,user) =>{
            var mailOptions = {
                from: 'price8858@gmail.com',
                to: email,
                subject: subject,
                text: `${user} here is price : ${price}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            }

const Trackers = db.define('tracker',{
    price: {
        type: Sequelize.STRING
    },
    uri: {
        type: Sequelize.STRING
    },
    user:{
        type: Sequelize.STRING
    },
    email:{
        type: Sequelize.STRING
    }
  }, 
  {
      hooks: {
        afterCreate: function(tracker) {
          const subject = 'You setup a new tracker'
          sendEmail(tracker.price,subject,tracker.email,tracker.user)
        },
         afterUpdate: function(tracker) {
           const subject = 'New price update'
           sendEmail(tracker.price,subject,tracker.email,tracker.user)
        }
      }
})


module.exports = {
    db,
    models: {
      Trackers,
    },
  };
