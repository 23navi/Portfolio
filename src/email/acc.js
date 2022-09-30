

//npm i @sendgrid/mail

const sgMail = require('@sendgrid/mail')

const template= require("../home/emailVerification");




sgMail.setApiKey(process.env.SENDGRID_API_KEY);




  const sendEmail=(emailId,user)=>{

    const msg = {
      to: emailId, 
      from: 'surekanavi@gmail.com', 
      subject: `Request from ${user}`,
      html: `<strong>Hello ${user}.</strong> <p>Thankyou for contacting me... I will reach back to you soon.</p>`,
    }
    sgMail
      .send(msg)
      .then(() => {
       console.log('Email sent')
    })
      .catch((error) => {
       console.error(error)
    })
  }


  const verifyEmail=(emailId,user)=>{
    const msg = {
      to: emailId, 
      from: 'surekanavi@gmail.com', 
      subject: `Request from ${user}`,
      html: template(user),
    }
    sgMail
      .send(msg)
      .then(() => {
       console.log('Email sent')
    })
      .catch((error) => {
       console.error(error)
    })
  }
  




  module.exports={
    sendEmail,
    verifyEmail
  }