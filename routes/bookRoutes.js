const bookRouter = require('express').Router();
const { addBook, deleteBook, getBook, getBooks, updateBook } = require("../controller/bookController")
const { authenticateToken } = require("../middlewares/auth")


bookRouter.route('/').get(authenticateToken, getBooks).post(authenticateToken, addBook);
bookRouter.route('/:id').get(authenticateToken, getBook).delete(authenticateToken, deleteBook).put(authenticateToken, updateBook);

module.exports = bookRouter;