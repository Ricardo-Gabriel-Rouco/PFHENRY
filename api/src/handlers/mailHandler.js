const {sender} = require('../controlers/mailsender')

const sendingEmail = async function (req, res){
  const {mail, reason} = req.body
  try {
    const result = await sender(mail, reason)
    res.send(mail)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  sendingEmail
}