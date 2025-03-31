const mongoose = require('mongoose')
const ItemSku = require('./itemskuSchema')

module.exports = {
    updateItemSku: async (params, set, result) => {
        let updateData = await ItemSku.updateMany(
            {
                productId: params.productId,
                bodyType: params.bodyType
            },
            {
                $set: set
            },
            result
        )

        return updateData
    },

    createItemSku: async (body)=>{
        let create = await ItemSku.create({
            productId: body.productId,
            bodyType: body.bodyType,
            price: body.price
        })
        return create
    }
}