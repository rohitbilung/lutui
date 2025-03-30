const orderService = require('../services/orders.service')

module.exports = {
    addCart : async (req,res)=> {
        let result = await orderService.addCart(req.body)
        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data,
                message: result.message
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    },
}