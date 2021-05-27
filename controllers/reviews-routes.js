const router = require("express").Router();
const sequelize = require("../config/connection");
const { Business, Review, User } = require("../models");
const nodemailer = require("nodemailer");

router.get('/:id', (req, res) => {
    
    Business.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "name", "type", "email", "phone", "address", "webpage", "linkedin", "user_id",
        [sequelize.literal('(SELECT ROUND(AVG(star_rating),2) FROM review WHERE business.id = review.business_id)'), 'star_rating_avg']
        ],
        order: ["name"],
        include: [
        // include the  model here:
        {
            model: User,
            attributes: ["username"],
        },
        {
            model: Review,
            attributes: ["id", "star_rating", "review_text", "business_id", "user_id", "created_at"],
            include: {
                model: User,
                attributes: ["username"],
            },
        },
        ],
        order: [
          [Review, "created_at", "DESC"]
        ],
    })
  .then(dbBusinessData => {
    const businessData = dbBusinessData.get({ plain: true });
    
    res.render('reviews', 
    { businessData, loggedIn: req.session.user_id });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/email', (req, res) => {
  console.log("sending email");

// Create the transporter with the required configuration for Outlook
// change the user and pass !
var transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: 'call-me-later-app@hotmail.com',
        pass: 'Call.1234321'
    }
});

// setup e-mail data, even with unicode symbols
var mailOptions = {
    from: '"Call Me Maybe reviews" <call-me-later-app@hotmail.com>', // sender address (who sends)
    to: req.body.email, // list of receivers (who receives)
    subject: 'Call Me Maybe! - new review for you business.', // Subject line
    html: `<b>Call me Maybe - Business Review</b><br><br> A new review for <b>${req.body.name}</b> has been posted in Call Me Maybe!<br>
          Review star rating: ${req.body.star_rating}.<br>Review comment: ${req.body.review_text}<br><br>
          For more information log in to your Call Me Maybe account. https://call-me-maybe-gp2.herokuapp.com/`
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
    res.json({msg: 'email sent'});
});

});



module.exports = router;
