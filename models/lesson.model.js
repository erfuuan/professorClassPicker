const mongoose = require('mongoose');
const moment = require('moment-jalali')
const { v4: uuidv4 } = require('uuid');


const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    registerDate: { type: Number, default: moment(new Date()).format('X') },
    unit: { type: Number, required: true },
    index: { type: String },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true, versionKey: false }

);

lessonSchema.pre('save', async function (next) {
    var date = moment(new Date()).format('jYYYY-jMM')
    const rawIndex = uuidv4().split("-")[0]
    console.log(rawIndex)
    const index = (rawIndex)
    this.index = index + "-" + date + "-";

    next();
});

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;