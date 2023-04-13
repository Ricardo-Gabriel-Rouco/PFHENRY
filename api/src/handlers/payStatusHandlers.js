const { verifyIdPayment } = require("../controlers/payStatusControllers");

const payStatusHandlers = async function (req, res) {

    const { payment_id } = req.body;
    try {
        const response = await verifyIdPayment(payment_id)
        res.send(response)
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    payStatusHandlers
}