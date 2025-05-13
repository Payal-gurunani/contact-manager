import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utils/asyncHandler'
import { ApiError } from '../utils/ApiError';
import { User } from '../models/user.model';
const verifyJwt = asyncHandler(async (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        throw new ApiError(401 ,"Unauthorized :No token provided")
    }
    const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    throw new ApiError(401, "Unauthorized: User not found");
  }

  req.user = user;
  next();

})