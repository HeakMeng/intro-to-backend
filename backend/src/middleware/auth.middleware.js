import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";

export const verifyJWT = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        const decodedToken = jwt.verify(
            token, 
            process.env.ACCESS_TOKEN_SECRET || "your-secret-key"
        );

        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
        }

        req.user = user;
        
        next(); 
    } catch (error) {
        res.status(401).json({ message: "Invalid Access Token", error: error.message });
    }
};