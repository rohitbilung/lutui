const itemskuModel = require('../models/itemsku/itemskuModel')

module.exports = {
    updateSku: async (query, body) => {
        try {
            let set = {}
            for (let item of body.quantity) {
                let sizeType = item.sizeType;
                set[`itemQuantity.$[size${sizeType}].quantity`] = item.quantity;
            }
            let arrayFilters = [];
            for (let item of body.quantity) {
                let sizeType = item.sizeType;
                arrayFilters.push({ [`size${sizeType}.sizeType`]: sizeType });
            }

            let result = {arrayFilters}

            let sku = await itemskuModel.updateItemSku(query, set, result)
        } catch (error) {
            return {
                error: error
            }
        }
    },

}