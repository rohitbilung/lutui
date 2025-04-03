const userModel = require('../models/userModel/user.model')

module.exports = {
    login: async (email, password) => {
        try {
            let user = await userModel.getUser({ email })
            if (user) {
                if(await user.matchPassword(password)){
                    return { status:200, data: user, token:1, message: "You have been logged in successfully." }
                }else{
                    return {status:401, data: null, message: "Please enter valid credentials." }
                }
            } else {
                return {status:404, data: null, message: "Could not find the resource you are looking for." }
            }
        } catch (error) {
            return {
                error: error
            }
        }
    },

    signup: async (body) => {
        try {
            let isExist = await userModel.getUser({ email: body.email })
            if (isExist) {
                return { status: 409, data: null, message:"email already exist"}
            }
            let user = await userModel.createUser(body)
            return { status: 201, data: user, message:"user created successful"}
        } catch (error) {
            return {
                error: error
            }
        }

    }
}