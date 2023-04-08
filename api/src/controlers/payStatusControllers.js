const { mercadopago } = require('../mpConfig/mpConfig')

const verifyIdPayment = async function (id) {
    try {
        const payment = await mercadopago.payment.get(id);
        if (payment.response.status === 'approved') {
            return "approved";
        }
        return "failure";
    } catch (error) {
        return error
    }
}

module.exports = {
    verifyIdPayment
}