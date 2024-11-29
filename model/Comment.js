const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        require: true
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment