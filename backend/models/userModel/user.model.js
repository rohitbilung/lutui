const mongoose = require('mongoose')
const Users = require('../userModel/user.schema')

module.exports = {
    getUser : async (params) => {
        try {
            let res = Users.findOne(params)
            return res
        } catch (error) {
            return error
        }
    },

    getUserByID : async (userId) => {
        try {
            let res = Users.findById(userId)
            return res
        } catch (error) {
            return error
        }
    },

    createUser : async (body) => {
        try {
            let res = Users.create(body)
            return res
        } catch (error) {
            return error
        }
    }
}

