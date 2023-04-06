const successHandlers = async function(req,res){
    // const responsePayment = {
    //     status : req.query.collection_status
    // }
    console.log(req.query)
    let status = req.query.status
    res.send(status)
}

module.exports = {
    successHandlers
}