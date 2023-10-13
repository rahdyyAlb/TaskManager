const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    label: { type: String, required: true },
    description: { type: String, required: true },
    dateTask: { type: Date, required: true },
    status: { type: Boolean, default: false },
});
module.exports = mongoose.model('Task', taskSchema);


