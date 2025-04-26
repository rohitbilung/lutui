const productModel = require('../models/productModel/product.model')

module.exports = {
    outOfStock: async (req, res, next) => {
        let product = await productModel.getProductsById(req.body.productId);
        let productType = product[req.body.type];
        let sizeDetails = productType.sizes.find(s => s.size === req.body.size);
        let colorDetails = sizeDetails.colors.find(c => c.color === req.body.color);
        if (colorDetails.count === 0) {
            return res.status(404).send({
                success: true,
                data: {},
                message: "Out Of Stock",
            });
        } else {
            next();
        }
    },

    checkStocks: async (req, res, next) => {
        let products = req.body.products
        try {
            for (let i = 0; i < products.length-1; i++) {
                const productId = products[i].productId;
                let product = await productModel.getProductsById(productId);
                let productType = product[req.body.products[i].type];
                let sizeDetails = productType.sizes.find(s => s.size === req.body.products[i].size);
                let colorDetails = sizeDetails.colors.find(c => c.color === req.body.products[i].color);
                if (sizeDetails && colorDetails && colorDetails.count === 0) {
                    return res.status(404).send({
                        success: true,
                        data: {},
                        message: `${product.name} is Out Of Stock`,
                    });
                }
                console.log("-----------")
            }
            next()
        } catch (error) {
            return error
        }

    }
}