import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { refreshAccessToken } from "../utils/jwtToken.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const token =
    req.cookies.accessToken || req?.headers?.authorization?.split(" ")[1];

  const refreshToken = req.cookies.refreshToken;

  if (!token) {
    if (!refreshToken)
      return next(new ErrorHandler("User not authenticated.", 401));

    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_JWT_SECRET_KEY
    );

    if (!verifyToken) {
      return response.status(401).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    const user = await User.findById(verifyToken?.id);
    refreshAccessToken(user, res);
  }

  const decoded = jwt.verify(token, process.env.ACCESS_JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);

  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
