const { verifyIdPayment } = require("../controlers/payStatusControllers");

//esta funcion queda en standBy por le momento
const payStatusHandlers = async function (req, res) {

    const { payment_id } = req.body;
    try {
        if(status === "approved"){
            const response = await verifyIdPayment(payment_id)
            res.send(response)

        }
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    payStatusHandlers
}