const userModel = require("../models/usersModel")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res) => {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {
            const Authheaders = req.headers.authorization.trim()
            const token = Authheaders.split(' ')[1]
            if (!token) {
                return res.status(401).json({ status: 400, message: "Unauthorized user" })
            }
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.userId = decode.id
            next()
        } catch (err) {
            console.log(err)
            return res.status(401).json({ status: 500, message: "invalid token" })
        }

    }
    else {
        return res.status(401).json({ status: 401, message: "Unautorized user" })
    }

}