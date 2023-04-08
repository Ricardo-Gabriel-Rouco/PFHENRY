const { verifyIdPayment } = require("../controlers/payStatusControllers");

const payStatusHandlers = async function (req, res) {

    const { payment_id } = req.body;
    try {
        res.send(await verifyIdPayment(payment_id))
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    payStatusHandlers
}