const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: (params) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            id: params._id,
            name: params.name,
            email: params.email,
            role: params.role,
            mobile: params.mobile,
            createdAt: params.createdAt,
            updatedAt: params.updatedAt,
        }
        let expireTime = { expiresIn: '1h' }
        const token = jwt.sign(data, jwtSecretKey, expireTime);
        return token;
    }
}