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
    }
}
