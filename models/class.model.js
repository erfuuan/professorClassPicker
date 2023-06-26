const mongoose = require('mongoose');
const moment = require('moment-jalali')
const { v4: uuidv4 } = require('uuid');


const classSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
        type: String,
        enum: ['open', 'reserved'],
        required: true
    },
    registerDate: { type: Number, required: true, default: moment(new Date()).format('X') },
    startTime: { type: Number, required: true },
    endTime: { type: Number, required: true },
    gender: { type: String, required: true, enum: ['boy', 'girl', 'all'] },
    day: { type: String, require: true, enum: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    teacherId: { type: mongoose.Types.ObjectId, ref: 'User', Number },
    index: { type: String },
    softDelete: { type: Boolean, required: true, default: false }
},
    { timestamps: true, versionKey: false }

);
classSchema.pre('save', async function (next) {
    var date = moment(new Date()).format('jYYYY-jMM')
    const rawIndex = uuidv4().split("-")[0]
    console.log("rawIndex")
    console.log(rawIndex)
    console.log("rawIndex")
    const index = (rawIndex)
    this.index = index + "-" + date + "-";

    next();
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;