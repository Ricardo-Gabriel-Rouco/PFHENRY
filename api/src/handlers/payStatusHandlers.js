const { verifyIdPayment } = require("../controlers/payStatusControllers");

const payStatusHandlers = async function (req, res) {

    // "userID": "xLv2xh4AGHX143e6lUEQQ03rwOB3",
    // "collection_id": "1313884245",
    // "collection_status": "approved",
    // "payment_id": "1313884245",
    // "status": "approved",
    // "external_reference": "null",
    // "payment_type": "account_money",
    // "merchant_order_id": "8583625250",
    // "preference_id": "1343626762-7099722f-7afe-4480-9468-dfe58408aa11",
    // "site_id": "MLA",
    // "processing_mode": "aggregator",
    // "merchant_account_id": "null"
    const { payment_id } = req.body;
    try {
        // res.send(await verifyIdPayment(payment_id))
        res.send(payment_id)
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
    // const infoPay = {
    //     payer: req.query.userID,
    //     status: req.query.status,
    //     preferenceId: req.query.preference_id,
    //     paymentId: req.query.payment_id
    // }
    // const query = `?data=${JSON.stringify(infoPay)}`;
    // res.redirect(`http://localhost:3000/home${query}`);
}

module.exports = {
    payStatusHandlers
}