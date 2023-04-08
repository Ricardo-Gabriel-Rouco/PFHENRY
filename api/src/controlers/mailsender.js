const nodemailer = require('nodemailer')
const template = require('./configmail')

async function sender(){
  // let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'hotmail',
    port: 587,
    auth: {
      user: 'bookskingdom@outlook.es',
      pass: 'pfHenry01'
    }
  })
  try {
    let info = await transporter.sendMail({
      from: template.from,
      to: template.to,
      subject: template.subject,
      text: template.text,
    })
    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sender
}