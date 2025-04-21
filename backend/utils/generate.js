
module.exports = {
    generateInvoice: (params) => {
        let length = 6
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let id = '';
        for (let i = 0; i < length; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    },
    generateToken: (params) => {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            id: params._id,
            name: params.name
        }
        let expireTime = { expiresIn: '1d' }
        const token = jwt.sign(data, jwtSecretKey, expireTime);
        return token;
    },
    generatePassword: (name) => {
        name = name.trim();
        if (name.length === 0) {
            throw new Error("Name cannot be empty");
        }

        const charset = "0123456789!@#$%^&*()_-+=<>?"
        let randomPart = '';
        for (let i = 0; i < 5; i++) {  // Length of random part (5 characters for example)
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomPart += charset[randomIndex];
        }
        let password = name + randomPart;
        return password;
    }
}