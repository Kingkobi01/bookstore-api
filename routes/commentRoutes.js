const express = require('express');
const commentRouter = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { getCommentsFromUser, getCommentsForBook, addComment, editComment, deleteComment } = require('../controller/commentController');

commentRouter.get("/user", authenticateToken, getCommentsFromUser);
commentRouter.get("/book", authenticateToken, getCommentsForBook);
commentRouter.post("/", authenticateToken, addComment);
commentRouter.put("/:commentId", authenticateToken, editComment);
commentRouter.delete("/:commentId", authenticateToken, deleteComment);


module.exports = commentRouter;