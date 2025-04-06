const orderService = require('../services/orders.service')
const { sendSuccessResponse, sendFailedResponse } = require('../utils/responseUtil')

module.exports = {
    addCart : async (req,res)=> {
        let result = await orderService.addCart(req.body, req.user)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },

    getCart : async (req,res)=> {
        let result = await orderService.getCart(req.params, req.user)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },
    
    removeCountFromCart : async (req,res)=> {
        let result = await orderService.removeCountFromCart(req.body, req.user)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },

    removeProductFromCart : async (req,res)=> {
        let result = await orderService.removeProductFromCart(req.body, req.user)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },
    
    checkout : async (req,res)=> {
        let result = await orderService.checkout(req.body, req.user)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },

}