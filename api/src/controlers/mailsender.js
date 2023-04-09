const nodemailer = require('nodemailer')
const template = require('./configmail')
require('dotenv').config();
const {MAILUSER, MAILPASSWORD} = process.env

async function sender(mail, reason){
  // let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'hotmail',
    port: 587,
    auth: {
      user: MAILUSER,
      pass: MAILPASSWORD
    }
  })
  switch (reason) {
    case 'success':
      try {
        let info = await transporter.sendMail({
          from: template.from,
          to: mail,
          subject: template.successPay,
          text: template.successText,
        })
      } catch (error) {
        console.log(error)
      }
      break
    case 'failed':
      try {
        let info = await transporter.sendMail({
          from: template.from,
          to: mail,
          subject: template.failedPay,
          text: template.failedText,
        })
      } catch (error) {
        console.log(error)
      }
      break
    case 'link':
      try {
        let info = await transporter.sendMail({
          from: template.from,
          to: mail,
          subject: template.link,
          text: template.linkText,
        })
      } catch (error) {
        console.log(error)
      }
      break
    default:
      break;
  }
  
}

module.exports = {
  sender
}

        // console.log("Message sent: %s", info.messageId)
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        