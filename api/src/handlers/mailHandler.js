const { sender, getUrlPDF } = require('../controlers/mailsender')

const sendingEmail = async function (req, res) {
  const { mail, reason, items } = req.body
  try {
    const urlsPdfItems = await getUrlPDF(items) 
    const result = await sender(mail, reason, urlsPdfItems)
    res.send(result)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  sendingEmail
}