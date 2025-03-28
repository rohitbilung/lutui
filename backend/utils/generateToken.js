const jwt = require('jsonwebtoken')

module.exports = {
    generateToken: (params) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            id: params,
            time: Date(),
            userId: 12,
        }
        let expireTime = { expiresIn: '1h' }
        const token = jwt.sign(data, jwtSecretKey,expireTime);
        return token;
    }
}