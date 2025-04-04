const orderModel = require('../models/ordersModel/orders.model')

module.exports = {
    addCart: async (body, user) => {
        try {
            let insertData = {
                "userId": body.userId ? body.userId :user.id,
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
            if (!cartExist) {
                let cart = await orderModel.addCart(insertData)
                return { status: 201, data: cart, message: "cart added successful" }
            } else {
                let productExists = false, tp;
                body.totalPrice = Number(cartExist.totalPrice)+Number((body.price*body.quantity))
                for (let product of cartExist.products) {
                    console.log(product.type)
                    console.log(body.type)
                  if (product.productId.equals(body.productId) && product.type === body.type && product.color === body.color && product.size === body.size) {
                    let updateExistProduct = await orderModel.updateExistingCombinedProducts(body)
                    productExists = true;
                    break;
                  }
                }
                if (!productExists) {
                    let product = {
                        "productId": body.productId,
                        "color": body.color,
                        "size": body.size,
                        "type": body.type,
                        "price": body.price,
                        "quantity": body.quantity
                    }
                    body.product = product
                    let cart = await orderModel.updateCart(body)
                }
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
            let data = await orderModel.getPopulateCart(params)
            if (data.length > 0) {
                return { status: 200, data: data, message: "fetched cart successful" }
            } else {
                return { status: 404, data: data, message: "No product available" }
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    removeAnItemFromCart: async (body) => {
        try {
            let data = await orderModel.removeAnProductCart(body)
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
