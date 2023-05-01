const mongoose = require('mongoose');
const moment = require('moment');
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobile: { type: Number, required: true },
    password: { type: String, required: true },
    activationCode: Number,
    role: { type: String, enum: ['admin', 'teacher'], required: true },
    email: { type: String,required: true  },
    // natCode: {type:Number,require:true},
    // gender: { type: String, enum: ['female', 'male'], },
    registerDate: { type: Number, required: true, default: moment(new Date()).format('X') },
    // avatarId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'File',
    // },
    softDelete: { type: Boolean, required: true, default: false },
    // softDelete: { type: Boolean, required: true},

    active: { type: Boolean, required: true, default: true }
},
    { timestamps: true, versionKey: false }
);
const User = mongoose.model('User', userSchema);
module.exports = User;