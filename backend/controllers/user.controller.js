const userService = require('../services/user.service')
const { generateToken } = require('../utils/generateToken')
const { sendSuccessResponse, sendFailedResponse } = require('../utils/responseUtil')

module.exports = {
    login: async (req, res) => {
        let token
        const { email, password } = req.body
        let result = await userService.login(email, password)
        if (result.status === 200) {
            token = generateToken(result.data)
        }
        if (result) {
            res.cookie('lutui-auth-token', token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1 day
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    signup: async (req, res) => {
        let result = await userService.signup(req.body)

        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    getUsers: async (req, res) => {

        let result = { status: 200 }

        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    getCurrentUsers: async (req, res) => {

        let result = { status: 200 }

        if (result) {
            sendSuccessResponse(req, res, result)
        } else {
            sendFailedResponse(req, res, result)
        }
    },

    logout: async (req, res) => {
        res.clearCookie('lutui-auth-token');
        sendSuccessResponse(req, res, { message: "logged out successful" })
    },

}