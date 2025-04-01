const userService = require('../services/user.service')
const { generateToken } = require('../utils/generateToken')

module.exports = {
    login: async (req, res) => {
        let token
        const { email, password } = req.body
        let result = await userService.login(email, password)
        if (result.status === 200) {
            console.log(result.data)
            token = generateToken(result.data)
        }
        if (result) {
            res.cookie('lutui-auth-token', token, { maxAge: 7 * 24 * 60 * 60 * 1000 }); // 1 day
            res.status(result.status).send({
                success: true,
                data: result.data,
                token: token || "",
                message: result.message
            });
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    },

    signup: async (req, res) => {
        let result = await userService.signup(req.body)

        if (result) {
            res.status(result.status).send({
                success: true,
                data: result.data,
                message: result.message
            });
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    },

    getUsers: async (req, res) => {

        let result = { status: 200 }

        if (result) {
            res.status(result.status).send({
                success: true,
                data: result.data || req.user,
                message: result.message || ""
            });
        } else {
            res.status(500).send({
                success: false,
                message: 'Server error',
                error: result.error,
            });
        }
    }
}