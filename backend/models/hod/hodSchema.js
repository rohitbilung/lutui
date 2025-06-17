const mongoose = require('mongoose')

const hodSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },{
        timestamps: true,
    }
)

const Hod = mongoose.model('Hod', hodSchema)

module.exports = Hod