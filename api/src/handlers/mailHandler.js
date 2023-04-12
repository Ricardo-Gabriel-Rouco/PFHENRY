const { sender } = require('../controlers/mailsender')
const { getDocs, query, collection, where } = require("firebase/firestore")
const { db } = require('../../firebase-config');

const sendingEmail = async function (req, res) {
  const { mail, reason } = req.body
  try {
    const result = await sender(mail, reason)
    {/*const q = query(collection(db, "books"), where('display', '==', true))
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({
        ...doc.data(),
        id: doc.id
      }
      )
    })*/}
    res.send(result)
  } catch (error) {
    res.send(error.message)
  }
}

module.exports = {
  sendingEmail
}