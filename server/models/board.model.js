const mongoose = require('mongoose')

const Schema = mongoose.Schema

const boardSchema = new Schema({
    username: String,
    title: {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    cover: {
        type: String,
        required: true,
    },
    lists: [new Schema({ id: String })]
}, {
    timestamps: true
})

const Board = mongoose.model('Board', boardSchema)
module.exports = Board