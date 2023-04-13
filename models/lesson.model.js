const mongoose = require('mongoose');
const moment = require('moment-jalali')

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    registerDate: { type: Number, default: moment(new Date()).format('X') },
    softDelete: { type: Boolean, default: false }
},
    { timestamps: true, versionKey: false }

);

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;