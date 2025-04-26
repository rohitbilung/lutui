const { isLoggedIn } = require('./check')
const userModel = require('../models/userModel/user.model')
const {generatePassword, generateGuestId} = require('../utils/generate')

module.exports = {
    isAuth: async (req, res, next) => {
        if (req.body.userId === '') {
            let guestId = generateGuestId(req,res)
            req.body.guestId = guestId
            let isExist = await userModel.getUser({ email: req.body.email })
            if (isExist) {
                req.body.userId = isExist.id
            } else {
                req.body.password = generatePassword(req.body.name)
                req.body.mobile = req.body.phone || req.body.mobile
                let user = await userModel.createUser(req.body)
                req.body.userId = user.id
            }
            next()
        } else {
            isLoggedIn(req, res, next)
        }
    }
}