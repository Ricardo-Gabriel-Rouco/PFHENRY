const {mercadopago} = require('../mpConfig/mpConfig')

const verifyIdPayment = async function (id) {
    try {
        // console.log(id)
        // const payment = await mercadopago.payment.get(id);
        // console.log(payment)
        // if (payment.status === 'approved') {
        //     // Actualiza el estado del pago en la base de datos
        //     // y realiza cualquier otra acción necesaria
        //     return "approved";
        // }
        // return "failure";
        return id
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    verifyIdPayment
}