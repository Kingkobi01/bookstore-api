const express = require('express')
const { authenticateToken } = require('../middlewares/auth')
const { registerCustomer, registerAdminUser, loginUser, getUserProfile, deleteUser, getAllUsers } = require('../controller/userController')

const userRouter = express.Router()


userRouter.post('/register/customer', registerCustomer)
userRouter.post('/register/admin', registerAdminUser)
userRouter.post('/login', loginUser)
userRouter.get('/me', authenticateToken, getUserProfile)
userRouter.get('/users', authenticateToken, getAllUsers)
userRouter.get('/users/:id', authenticateToken, getUserProfile)
userRouter.delete('/users/:id', authenticateToken, deleteUser)


module.exports = userRouter