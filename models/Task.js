const mongoose = require('mongoose')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    is_compleated: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = Task = mongoose.model('Task', TaskSchema)