import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()
export const genrateToken = (userId) =>{
    return jwt.sign({_id:userId} ,process.env.JWT_SECRET,{
        expiresIn:"2hr",
    })
}