const {mercadopago} = require('../mpConfig/mpConfig')

const verifyIdPayment = async function (id) {
    try {
        const payment = await mercadopago.payment.get(id);
        console.log(payment)
        if (payment.status === 'approved') {
            // Actualiza el estado del pago en la base de datos
            // y realiza cualquier otra acción necesaria
            return "approved";
        }
        return "failure";
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyIdPayment
}