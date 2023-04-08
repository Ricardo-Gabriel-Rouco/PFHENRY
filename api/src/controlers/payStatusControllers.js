const { mercadopago } = require('../mpConfig/mpConfig')

const verifyIdPayment = async function (id) {
    try {
        const payment = await mercadopago.payment.findById(id);
        // if (payment.status === 'approved') {
        //     // Actualiza el estado del pago en la base de datos
        //     // y realiza cualquier otra acción necesaria
        //     return "approved";
        // }
        // return "failure";
        return payment
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyIdPayment
}