const orderModel = require('../models/ordersModel/orders.model')

module.exports = {
    addCart: async (body) => {
        try {
            body.status = "pending"
            let cartExist = await orderModel.getCart(body)
            if(cartExist.length == 0){
                let cart = await orderModel.addCart(body)
                return { status: 201, data: cart, message:"cart added successful"}
            }else{
                let cart = await orderModel.updateCart(body)
                return { status: 200, data: "cart", message:"cart update successful"}
            }
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
    
    removeProductCart: async (body) => {
        try {
            let data = await orderModel.removeProductCart(body)
            console.log(data)
            if(data.modifiedCount === 1){
                return { status: 200, data: "", message:"Product modified successful"}
            }else{
                return { status: 200, data: "", message:"Nothing happened"}
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },
}
