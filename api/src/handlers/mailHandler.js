const {sender} = require('../controlers/mailsender')

const sendingEmail = async function (req, res){
  try {
    const result = await sender()
    res.status(200).send(result)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  sendingEmail
}