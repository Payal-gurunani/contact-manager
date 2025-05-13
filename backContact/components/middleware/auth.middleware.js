import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  
  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided in cookies");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

    // Fetch the user based on the decoded ID
    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
});

export { verifyJwt };




 // const authHeader = req.headers.authorization;

    // if(!authHeader || !authHeader.startsWith("Bearer ")){
    //     throw new ApiError(401 ,"Unauthorized :No token provided")
    // }