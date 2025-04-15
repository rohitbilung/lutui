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
                data: {} ,
                message: "Out Of Stock",
              });
        }else{
            next();
        }
    }
}