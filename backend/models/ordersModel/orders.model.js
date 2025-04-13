const mongoose = require('mongoose')
const Order = require('../ordersModel/orders.schema')
const { addCart } = require('../../services/orders.service')

module.exports = {
    getCart: async (body) => {
        try {
            let params = {
                userId: body.userId ? body.userId : body._id,
                "paymentStatus": body.paymentStatus ? body.paymentStatus : "pending"
            }
            let res = await Order.findOne(params)
            return res
        } catch (error) {
            return error
        }
    },

    getPopulateCart: async (body) => {
        try {
            let params = {
                userId: body.userId,
                "paymentStatus": body.paymentStatus
            }
            let res = await Order.findOne(params)
                .populate('userId')
                .populate('products.productId', 'name category _id')
            return res
        } catch (error) {
            return error
        }
    },

    addCart: async (body) => {
        try {
            let res = await Order.create(body)
            return res
        } catch (error) {
            return error
        }
    },

    updateCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending"
                },
                {
                    $push: {
                        "products": body.product
                    },
                    $set: {
                        "totalPrice": body.totalPrice
                    }
                },
            )
            return res
        } catch (error) {
            return error
        }
    },

    updateExistingCombinedProducts: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    "products.productId": body.productId,
                    paymentStatus: "pending"
                },
                {
                    $set: {
                        totalPrice: body.totalPrice,
                    },
                    $inc: {
                        "products.$[elem].quantity": 1
                    },
                },
                {
                    arrayFilters: [
                        {
                            "elem.productId": body.productId,
                            "elem.size": body.size,
                            "elem.type": body.type,
                            "elem.color": body.color
                        }
                    ]
                }
            );
            return res
        } catch (error) {
            return error
        }
    },

    removeCountFromCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending",
                    "products.productId": body.productId, // Ensure the product exists
                },
                {
                    $set: {
                        totalPrice: body.totalPrice,
                    },
                    $inc: {
                        "products.$[elem].quantity": -1
                    },
                },
                {
                    arrayFilters: [
                        {
                            "elem.productId": body.productId,
                            "elem.size": body.size,
                            "elem.type": body.type,
                            "elem.color": body.color
                        }
                    ]
                }
            );
            await Order.updateOne(
                {
                    userId: body.userId,
                    paymentStatus: "pending",
                },
                {
                    $pull: {
                        products: {
                            quantity: 0, // Remove product if quantity is zero
                        },
                    },
                }
            );
            await Order.deleteOne({
                paymentStatus: "pending",
                userId: body.userId,
                products: { $size: 0 }
            })
            return res;
        } catch (error) {
            return error;
        }
    },

    removeProductFromCart: async (body) => {
        try {
            let res = await Order.updateOne(
                {
                    userId: body.userId,
                    'products.productId': body.productId,
                    paymentStatus: "pending"
                },
                {
                    $pull: {
                        products: {
                            productId: body.productId,
                            color: body.color,
                            size: body.size,
                            type: body.type
                        },
                    },
                    $set: {
                        "totalPrice": body.totalPrice
                    }
                }
            )
            await Order.deleteOne({
                paymentStatus: "pending",
                userId: body.userId,
                products: { $size: 0 }
            })
            return res
        } catch (error) {
            return error
        }
    },

    checkout: async (body) => {
        let res = await Order.updateOne(
            {
                userId: body.userId,
                paymentStatus: "pending"
            },
            {
                $set: body
            }
        );
        return res
    },

    updatePaymentInfoToCart: async (user, data) => {
        let res = await Order.updateOne(
            {
                userId: user.id,
                paymentStatus: "pending"
            },
            {
                $set: {
                    paymentStatus: data.status,
                    paymentId: data.paymentId,
                    orderId: data.orderId
                }
            }
        );
        return res
    },

    getOrders: async (query, pagination) => {
        let page = Number(query.page),
            limit = Number(query.limit);
        let match = {}
        if (query.paymentStatus !== '') {
            match['paymentStatus'] = query.paymentStatus
        }
        if (query.search && query.search.trim() !== '') {
            match['name'] = { $regex: query.search.trim(), $options: 'i' }; // case-insensitive regex
        }
        try {
            let data = await Order.aggregate([
                { $match: match },
                { $sort: { createdAt: -1 } },
                { $skip: limit * (page - 1) },
                { $limit: limit },
            ]);

            const total_records = await Order.countDocuments(match);
            const total_pages = Math.ceil(total_records / limit);
            let next_page = null;
            const viewed_records = (page - 1) * limit;
            if (viewed_records + limit < total_records) {
                next_page = page + 1;
            }
            const page_records = data.length;

            pagination.total = total_records;
            pagination.page_records = page_records;
            pagination.page_no = page;
            pagination.total_pages = total_pages;
            pagination.next_page = next_page;

            if (page > 1) {
                let prev_page = page - 1;
                if (total_records < page) {
                    prev_page = total_records;
                }
                pagination.prev_page = prev_page;
            }

            return { data, pagination };
        } catch (error) {
            return { error };
        }
    },

    updateOrders : async (query) => {
        let set = {}
        if(query.delhiveryStatus){
            set = {
                delhiveryStatus : "shipped"
            }
        }
        let res = await Order.updateOne(
            {
                _id: query._id
            },
            {
                $set: set
            }
        )
    }

}
