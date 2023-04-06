const mongoose = require('mongoose');
const moment = require('moment-jalali')
const { v4: uuidv4 } = require('uuid');


const classSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['open', 'reserved'],
        required: true
    },
    registerDate: { type: Number, required: true, default: moment(new Date()).format('X') },
    time: { type: Array, required: true },
    teacherId: { type: mongoose.Types.ObjectId, ref: 'User', Number },
    index: { type: String},
    softDelete: { type: Boolean, required: true, default: false }

},
    { timestamps: true }
);
classSchema.pre('save', async function (next) {
    var date = moment(new Date()).format('jYYYY-jMM')
    const rawIndex = uuidv4().split("-")[0]
    console.log(rawIndex)
    const index = (rawIndex)
    this.index = index + "-" + date + "-" ;

    next();
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;