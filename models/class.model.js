const mongoose = require('mongoose');
const Options = require("./optionModel")
const moment = require('moment-jalali')

const classSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: ['open', 'reserved'],
        required: true
    },
    registerDate: { type: Number, required: true, default: moment(new Date()).format('X') },
    teacherId: { type: mongoose.Types.ObjectId, ref: 'User', Number, required: true },
    index: { type: String, required: true },
    softDelete: { type: Boolean, required: true, default: false }

},
    { timestamps: true }
);
classSchema.pre('save', async function (next) {
    var date = moment(new Date()).format('jYYYY-jMM')
    const raw = await Options.findOne({ key: 'classIndex' });
    const rawIndex = raw.value
    const id = raw._id
    const index = parseInt(rawIndex) + 1
    this.index = index + "-" + date + "-" + this.status;
    await Options.findByIdAndUpdate(id, { value: index }, {
        new: true,
    });
    next();
});

const Class = mongoose.model('Class', classSchema);
module.exports = Class;