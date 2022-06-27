import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/user";

const verifyToken = async (req, res, next) => {

    try{
        const token = req.headers["x-access-token"]

        if(!token){
            return res.status(403).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, config.SECRET);
        req.userId = decoded.id;

        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        next();
    }catch(error){
        return res.status(500).json({ message: "Unauthorized" });
    }

};

export default verifyToken;