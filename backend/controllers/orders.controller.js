const orderService = require('../services/orders.service')
const { sendSuccessResponse, sendFailedResponse } = require('../utils/responseUtil')

module.exports = {
    addCart: async (req, res) => {
        let result = await orderService.addCart(req.body, req.user)
        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    getCart: async (req, res) => {
        let result = await orderService.getCart(req.params, req.user)
        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    removeCountFromCart: async (req, res) => {
        let result = await orderService.removeCountFromCart(req.body, req.user)
        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    removeProductFromCart: async (req, res) => {
        let result = await orderService.removeProductFromCart(req.body, req.user)
        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    checkout: async (req, res) => {
        let result = await orderService.checkout(req.body, req.user)
        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    getOrders: async (req, res) => {
        let pagination = {
            total: 0,
            page_records: 0,
            page_no: 1,
            total_pages: 1,
            next_page: null,
            prev_page: null,
        };
        let result = await orderService.getOrders(req.query, pagination)
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
    },

}