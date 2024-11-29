const Book = require('../model/Book')


const addBook = async (req, res) => {
    try {
        const { title, author, url, imageUrl } = req.body.book;
        if (!title || !author || !url) {
            return res.status(500).json({
                message: "Please fill in all fields"
            })
        }
        const newBook = await new Book({
            title,
            author,
            url,
            imageUrl
        })
        await newBook.save();
        res.status(201).json({
            message: "Book added successfully",
            id: newBook._id
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getBooks = async (req, res) => {
    try {
        const books = await Book.find()
        res.status(200).json({ books });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({ book });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteBook = async (req, res) => {
    try {
        const result = await Book.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const updateBook = async (req, res) => {
    try {
        const { title, author, url, imageUrl } = req.body.book;
        const book = await Book.findByIdAndUpdate(req.params.id, {
            title,
            author,
            url,
            imageUrl
        }, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        book.save();
        return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook
}