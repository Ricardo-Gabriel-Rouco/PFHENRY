const { mercadopago } = require('../mpConfig/mpConfig')

const verifyIdPayment = async function (id) {
    try {
        const payment = await mercadopago.payment.get("1313894533");
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