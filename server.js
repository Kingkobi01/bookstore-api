const connectDb = require('./dbConnect');
const express = require('express')
const userRouter = require('./routes/userRoutes')
const bookRouter = require('./routes/bookRoutes');
const commentRouter = require('./routes/commentRoutes');
require('dotenv').config()
const app = express()

connectDb();

app.use(express.json())


app.get('/', (req, res) => {
    res.json({ message: 'API is running' }).status(200)
})

app.get('/greet', (req, res) => {
    res.send(`Hello, ${req.query.name || "user"}`).status(200)
})

app.use('/auth', userRouter)
app.use('/books', bookRouter)
app.use('/comments', commentRouter)


const PORT = process.env.PORT || 5000
app.listen(PORT, () => [
    console.log(`Server running on port ${PORT}`)

])