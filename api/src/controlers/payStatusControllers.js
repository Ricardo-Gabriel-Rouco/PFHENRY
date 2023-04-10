const { mercadopago } = require('../mpConfig/mpConfig')

const verifyIdPayment = async function (id) {
    try {
        // const payment = await mercadopago.payment.get(id);
        // if (payment.response.status === 'approved') {
        //     return "approved";
        // }
        return id;
    } catch (error) {
        return error
    }
}

module.exports = {
    verifyIdPayment
}