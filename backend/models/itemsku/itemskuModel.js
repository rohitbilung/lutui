const mongoose = require('mongoose')
const ItemSku = require('./itemskuSchema')

module.exports = {
    updateItemSku: async (params, set, result) => {
        let updateData = await ItemSku.updateOne(
            {
                productId: params.productId,
                bodyType: params.bodyType
            },
            {
                $set: set
            },
            result
        )
        console.log(updateData)
        return 
    },

    createItemSku: async (body)=>{
        let create = await ItemSku.create({
            productId: body.productId,
            bodyType: body.bodyType,
            price: body.price,
            itemQuantity:[
                {
                    sizeType:"S",
                    quantity: 0
                },
                {
                    sizeType:"M",
                    quantity: 0
                },
                {
                    sizeType:"L",
                    quantity: 0
                },
                {
                    sizeType:"XL",
                    quantity: 0
                },
                {
                    sizeType:"XXL",
                    quantity: 0
                },
            ]
        })
        return create
    }
}