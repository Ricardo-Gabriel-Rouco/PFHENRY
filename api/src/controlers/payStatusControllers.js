const { mercadopago } = require('../mpConfig/mpConfig')
const axios = require('axios')

const verifyIdPayment = async function (id) {
    try {
        const payment = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, {
            headers: {
              'Authorization': `Bearer ${mercadopago}`
            }
          });
        // if (payment.status === 'approved') {
        //     // Actualiza el estado del pago en la base de datos
        //     // y realiza cualquier otra acción necesaria
        //     return "approved";
        // }
        // return "failure";
        console.log(payment)
        return payment
    } catch (error) {
        return error
    }
}

module.exports = {
    verifyIdPayment
}