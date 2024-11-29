const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized access'
            })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    message: 'Token is invalid'
                })
            }
            req.user = user
            next()
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Unauthorized access'
            })
        }
        next()
    }
}

module.exports = { authenticateToken, authorizeRoles }