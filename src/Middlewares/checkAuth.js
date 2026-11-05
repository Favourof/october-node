import jwt from 'jsonwebtoken'
import { envConfig } from '../config/envConfig.js'
import User from '../models/user.js'
export const checkAuth = async(req, res, next) => {
    try {
        const header = req.headers.authorization
        if (!header) {
            res.status(401).json({ status: false, message: "Token not Found" })
        }
        const token = header.split("Bearer ")[1]
        console.log(token);

        try {
            const payload = jwt.verify(token, envConfig.jwt.jwtSecretKey)
            console.log(payload);
            const existingUser = await User.findById(payload.data)
            
            if (!existingUser) {
                return res.status(401).json({ status: false, message: "unauthorized" })
            }
            req.id = payload.data
            next()
        } catch (error) {
            console.log(error);
            res.status(401).json({ status: false, message: error.message })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: error.message })

    }
}