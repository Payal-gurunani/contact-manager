import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.model.js';

const verifyJwt = asyncHandler(async (req, res, next) => {
  let token;

  // 1. First check for token in Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. Fallback to token in cookies (optional, for flexibility)
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      throw new ApiError(401, "Unauthorized: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
});

export { verifyJwt };
