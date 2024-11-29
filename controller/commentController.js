const Comment = require('../model/Comment')


const getCommentsForBook = async (req, res) => {
    try {
        const comments = await Comment.find({ book: req.query.bookId })

        if (!comments) {
            return res.status(404).json({ message: "No comments found" });
        }
        return res.json({
            comments
        }).status(201)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCommentsFromUser = async (req, res) => {
    try {
        const comments = await Comment.find({ user: req.query.userId })

        if (!comments) {
            return res.status(404).json({ message: "No comments found" });
        }

        return res.status(201).json({ comments })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addComment = async (req, res) => {
    try {
        const { text, bookId } = req.body.comment
        const newComment = await new Comment({
            text,
            book: bookId,
            user: req.user.id
        })
        newComment.save()

        return res.status(201).json({ message: "Comment added successfully" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editComment = async (req, res) => {
    try {
        const { text } = req.body.comment
        const comment = await Comment.findById(req.params.commentId)

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        comment.text = text
        comment.save()

        return res.status(201).json({ message: "Comment edited successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const deleteComment = async (req, res) => {
    try {
        const result = await Comment.findByIdAndDelete(req.params.commentId)
        if (!result) {
            return res.status(404).json({ message: "Comment not found" });
        }
        return res.status(201).json({ message: "Comment deleted successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

module.exports = {
    getCommentsForBook,
    getCommentsFromUser,
    addComment,
    editComment,
    deleteComment
}