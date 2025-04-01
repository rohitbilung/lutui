const productService = require('../services/product.service')

module.exports = {
    createProduct : async (req,res)=> {
        let result = await productService.createProduct(req.body)
        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data,
                message: result.message
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    },

    getProductsById : async (req, res) => {
        let result = await productService.getProductsById(req.query)
        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data || "",
                message: result.message || ""
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    },

    getProducts : async (req,res) => {
        
        let result = await productService.getProducts()

        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data || req.user,
                message: result.message || ""
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    }
}