const orderModel = require('../models/ordersModel/orders.model')

module.exports = {
    createCart: async (req, res, next) => {
        let cartExist = await orderModel.getCart(req.body)
        if(cartExist){
            next()
        }else{
            let totalPrice = 0
            req.body.products.map((i)=>{
                totalPrice+=Number(i.price * i.quantity)
            })
            let insertData = {
                "userId": req.body.userId ? req.body.userId : req.user.id,
                "guestId":req.body.guestId,
                "products": req.body.products,
                "totalPrice": totalPrice,
                "paymentStatus": "pending",
                "delhiveryStatus": 'pending'
            }
            await orderModel.addCart(insertData)
            next()
        }
    },
}