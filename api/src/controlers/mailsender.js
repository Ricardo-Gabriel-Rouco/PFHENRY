const nodemailer = require('nodemailer')
const template = require('./configmail');
const { getDocs, query, collection } = require("firebase/firestore")
const { db } = require('../../firebase-config');
require('dotenv').config();
const { MAILUSER, MAILPASSWORD } = process.env

async function getUrlPDF(items) {
  try {
    const q = query(collection(db, "books"))
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({
        ...doc.data(),
        id: doc.id
      }
      )
    })
    const itemsOrder = items;
    const urlPdfBooks = [];

    data.forEach(e => {
      const item = itemsOrder.find(i => i.id === e.id);
      if (item) {
        urlPdfBooks.push({
          title: e.title,
          link: e.linkBook
        });
      }
    });
    return urlPdfBooks;
  } catch (error) {
    return [];
  }
}
// async function getConfig(){
//   let options = []
//   const data = collection(db, "mailConfig")
//   const results = await onSnapshot(data, (option)=> {
//     option.docs.map(doc => options.push(doc.data()))
//   })
//   return results
// }

async function sender(mail, reason, urlBooks) {
  // let testAccount = await nodemailer.createTestAccount()

  // const configs = await getConfig()

  // console.log(configs)
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
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
        return (error)
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
        return (error)
      }

    case 'link':
      try {
        const bookList = urlBooks.map(book => `- ${book.title}: ${book.link}`).join('\n');
        const message = `Thank you for your purchase! Here's the list of books you bought:\n${bookList}`;
        let info = await transporter.sendMail({
          from: template.from,
          to: mail,
          subject: template.link,
          text: message,
        })
        return "Message sent"
      } catch (error) {
        return (error)
      }

    default:
      break;
  }

}

module.exports = {
  sender, getUrlPDF
}

        // console.log("Message sent: %s", info.messageId)
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
