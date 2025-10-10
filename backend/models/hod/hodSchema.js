const mongoose = require('mongoose')

const hodSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        propertyInterest: {
            type: String,
            enum: ['high','medium','low'],
            dafault: 'high',
        },
        callStatus: {
            type: String,
            enum: ['not_called','called','follow_up_required'],
            default: 'not_called',
        },
        budget: {
            type: String,
            enum:['0-50L','50L-1Cr','1Cr-5Cr','>5Cr'],
            default:'50L-1Cr'
        },
        note:{
            type:String,
            default:'no call notes yet'
        }
    },{
        timestamps: true,
    }
)

const Hod = mongoose.model('Hod', hodSchema)

module.exports = Hod