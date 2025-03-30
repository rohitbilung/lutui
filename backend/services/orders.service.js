const orderModel = require('../models/ordersModel/orders.model')

module.exports = {
    addCart: async (body) => {
        try {
            let user = await orderModel.addCart(body)
            return { status: 201, data: user, message:"Product created successful"}
        } catch (error) {
            return {
                error: error
            }
        }
    },
    
    getCart: async (params) => {
        try {
            params.status = "pending"
            let data = await orderModel.getCart(params)
            if(data.length>0){
                return { status: 200, data: data, message:"Product created successful"}
            }else{
                return { status: 404, data: data, message:"No product available"}
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },
}
