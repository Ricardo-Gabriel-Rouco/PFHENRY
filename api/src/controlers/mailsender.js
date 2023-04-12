const nodemailer = require('nodemailer')
const template = require('./configmail')
// const { collection, onSnapshot} = require("firebase/firestore");
// const db = require('../../firebase-config')
require('dotenv').config();
const {MAILUSER, MAILPASSWORD} = process.env


// async function getConfig(){
//   let options = []
//   const data = collection(db, "mailConfig")
//   const results = await onSnapshot(data, (option)=> {
//     option.docs.map(doc => options.push(doc.data()))
//   })
//   return results
// }

async function sender(mail, reason){
  // let testAccount = await nodemailer.createTestAccount()

  // const configs = await getConfig()

  // console.log(configs)
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
        return "Message sent"
      } catch (error) {
        return(error)
      }
      
    case 'failed':
      try {
        let info = await transporter.sendMail({
          from: template.from,
          to: mail,
          subject: template.failedPay,
          text: template.failedText,
        })
        return "Message sent"
      } catch (error) {
        return(error)
      }
      
    case 'link':
      try {
        let info = await transporter.sendMail({
          from: template.from,
          to: mail,
          subject: template.link,
          text: template.linkText,
        })
        return "Message sent"
      } catch (error) {
        return(error)
      }
      
    default:
      break;
  }
  
}

module.exports = {
  sender
}

        // console.log("Message sent: %s", info.messageId)
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        