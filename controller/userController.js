const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/User');


const registerCustomer = async (req, res) => {
    try {
        const { username, email, password } = req.body.user;
        if (!username || !email || !password) {
            return res.status(500).json({
                message: "Please fill in all fields"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            hashedPassword
        })
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const registerAdminUser = async (req, res) => {
    try {
        const { username, email, password } = req.body.user;
        if (!username || !email || !password) {
            return res.status(500).json({
                message: "Please fill in all fields"
            })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User with this email already exists"
            })
        }
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                message: "User with this username already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username,
            email,
            hashedPassword,
            role: "admin"
        })
        await newUser.save();
        res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body.user;
        if (!email || !password) {
            return res.status(500).json({
                message: "Please fill in all fields"
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "User with this email does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword)

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const serializedUser = {
            id: user._id,
            role: user.role
        }

        const token = jwt.sign(serializedUser, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })


        res.status(200).json({
            message: "User logged in successfully", token
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const getUserProfile = async (req, res) => {
    try {
        if (req.params.id) {
            const user = await User.findById(req.params.id)
            const parsedUser = ({ _id, username, email, role } = user)
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(parsedUser)
        }
        const user = await User.findById(req.user.id)
        const parsedUser = ({ _id, username, email, role } = user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(parsedUser)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const deleteUser = async (req, res) => {
    try {
        const result = await User.findByIdAndDelete(req.params.id)

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(202).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        const usersWithoutPassword = users.map(user => ({ _id, username, email, role } = user))
        res.json(usersWithoutPassword).status(200)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    registerCustomer,
    registerAdminUser,
    loginUser,
    getUserProfile,
    getAllUsers,
    deleteUser
}