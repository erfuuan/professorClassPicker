const mongoose = require('mongoose');
const moment = require('moment-jalali')

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    registerDate: { type: Number, required: true, default: moment(new Date()).format('X') },
    softDelete: { type: Boolean, required: true, default: false }
},
    { timestamps: true }
);

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;