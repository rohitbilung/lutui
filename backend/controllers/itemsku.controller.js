const itemskuService = require('../services/itemsku.service')

module.exports = {
    updateSku : async (req,res)=> {
        let result = await itemskuService.updateSku(req.query, req.body)
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
                error: result,
            });
        }
    },

}