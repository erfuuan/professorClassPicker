const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    value: String,
    softDelete: { type: Boolean, required: true, default: false }
},
{ timestamps: true, versionKey: false }

);

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;