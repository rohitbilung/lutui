const productService = require('../services/product.service')

module.exports = {
    createProduct : async (req,res)=> {
        let result = await productService.createProduct(req.body)
        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data,
                token: token || "",
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

    z : async (req, res) => {
        let result = await userService.signup(req.body)

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

    x : async (req,res) => {
        
        let result = {status:200}

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