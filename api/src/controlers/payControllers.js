const {mercadopago} = require('../mpConfig/mpConfig')

const sendPreferencePayment = async function (preference) {
    try {
        const res = await mercadopago.preferences.create(preference)
        return res.body.sandbox_init_point
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    sendPreferencePayment
}