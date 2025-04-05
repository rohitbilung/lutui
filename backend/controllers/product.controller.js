const productService = require('../services/product.service')
const mongoose = require('mongoose')
const { sendSuccessResponse, sendFailedResponse } = require('../utils/responseUtil')

module.exports = {
    createProduct : async (req,res)=> {
        let result = await productService.createProduct(req.body)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },

    getProductsById : async (req, res) => {
        let result = await productService.getProductsById(req.query)
        if(result){
            sendSuccessResponse(req, res, result)
        }else{
            sendFailedResponse(req, res, result)
        }
    },

    getProducts : async (req,res) => {
        let pagination = {
            total: 0,
            page_records: 0,
            page_no: 1,
            total_pages: 1,
            next_page: null,
            prev_page: null,
          };
        let result = await productService.getProducts(req.query, pagination)

        if(result){
            res.status(result.status).send({
                success: true,
                data: result.data || req.user,
                message: result.message || "",
                pagination: result.pagination || pagination
            });
        }else{
            res.status(500).send({
                success: false,
                message: 'Something went wrong in the server.',
                pagination,
                error: result.error,
            });
        }
    }
}