const payStatusHandlers = async function(req,res){
    // const responsePayment = {
    //     status : req.query.collection_status
    // }
    res.send(req.query)
}

module.exports = {
    payStatusHandlers
}