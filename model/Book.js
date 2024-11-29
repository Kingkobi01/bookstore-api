const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: String,
        require: true,
    },
    url: {
        type: String,
        require: true,
    },
    imageUrl: {
        type: String,
    }
}, {
    timestamps: true
})


const Book = mongoose.model('Book', bookSchema)

module.exports = Book