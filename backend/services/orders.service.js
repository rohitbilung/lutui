const orderModel = require('../models/ordersModel/orders.model')

module.exports = {
    addCart: async (body, user) => {
        try {
            let insertData = {
                "userId": user.id ? user.id : body.id,
                "products": [
                    {
                        "productId": body.productId,
                        "color": body.color,
                        "size": body.size,
                        "type": body.type,
                        "price": body.price,
                        "quantity": body.quantity
                    }
                ],
                "totalPrice": Number(body.price) * Number(body.quantity),
                "paymentStatus": "pending",
                "delhiveryStatus": 'pending'
            }
            let cartExist = await orderModel.getCart(insertData)
            if (cartExist.length == 0) {
                let cart = await orderModel.addCart(insertData)
                return { status: 201, data: cart, message: "cart added successful" }
            } else {
                let cart = await orderModel.updateCart(insertData)
                return { status: 200, data: "cart", message: "cart update successful" }
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    getCart: async (params, user) => {
        try {
            params.paymentStatus = "pending"
            let data = await orderModel.getCart(params)
            if (data.length > 0) {
                return { status: 200, data: data, message: "Product created successful" }
            } else {
                return { status: 404, data: data, message: "No product available" }
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
            if (data.modifiedCount === 1) {
                return { status: 200, data: "", message: "Product modified successful" }
            } else {
                return { status: 200, data: "", message: "Nothing happened" }
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    checkout: async (body, user) => {
        try {
            if(user){}
            
            let data = await orderModel.checkout(body)
            return { status: 200, data: "", message: "susscessfully" }
        } catch (error) {
            return {
                error: error
            }
        }
    },
}
