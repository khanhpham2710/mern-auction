import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { generateToken, refreshAccessToken } from "../utils/jwtToken.js";
import { uploadImage } from "../utils/cloudinary.js";
import { sendVerifyEmail } from "../utils/sendEmail.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      userName,
      email,
      password,
      phone,
      address,
      role,
      bankAccountNumber,
      bankAccountName,
      bankName,
      paypalEmail,
      verificationMethod,
    } = req.body;

    if (
      !userName ||
      !email ||
      !phone ||
      !password ||
      !address ||
      !verificationMethod
    ) {
      return next(new ErrorHandler("All fields are required.", 400));
    }


    if (role === "Auctioneer") {
      if (!bankAccountName || !bankAccountNumber || !bankName) {
        return next(
          new ErrorHandler("Please provide your full bank details.", 400)
        );
      }
      if (!paypalEmail) {
        return next(new ErrorHandler("Please provide your paypal email.", 400));
      }
    }

    function validatePhoneNumber(phone) {
      const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
      return phoneRegex.test(phone);
    }

    if (!validatePhoneNumber(phone)) {
      return next(new ErrorHandler("Invalid phone number.", 400));
    }

    const existingUser = await User.findOne({
      $or: [
        {
          email,
          accountVerified: true,
        },
        {
          phone,
          accountVerified: true,
        },
      ],
    });

    if (existingUser) {
      return next(new ErrorHandler("Phone or Email is already used.", 400));
    }

    const registerationAttemptsByUser = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false },
      ],
    });

    if (registerationAttemptsByUser.length > 3) {
      return next(
        new ErrorHandler(
          "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
          400
        )
      );
    }

    const userData = {
      userName,
      email,
      phone,
      password,
      address,
      role,
      paymentMethods: {
        bankTransfer: {
          bankAccountNumber,
          bankAccountName,
          bankName,
        },
        paypal: {
          paypalEmail,
        },
      },
    };

    const user = await User.create(userData);

    const verificationCode = await user.generateVerificationCode();

    await user.save();

    sendVerifyEmail(user, verificationCode, res);
  } catch (error) {
    next(error);
  }
});

export const resendOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, phone } = req.body;

  function validatePhoneNumber(phone) {
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  try {
    const userAllEntries = await User.find({
      $or: [
        {
          email,
          accountVerified: false,
        },
        {
          phone,
          accountVerified: false,
        },
      ],
    }).sort({ createdAt: -1 });

    if (userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found.", 404));
    }

    const user = userAllEntries[0];

    const verificationCode = await user.generateVerificationCode();

    // user.save()

    sendVerifyEmail(user, verificationCode, res);
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error.", 500));
  }
});

export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp, phone } = req.body;

  function validatePhoneNumber(phone) {
    const phoneRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  try {
    const userAllEntries = await User.find({
      $or: [
        {
          email,
          accountVerified: false,
        },
        {
          phone,
          accountVerified: false,
        },
      ],
    }).sort({ createdAt: -1 });

    if (userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user;

    if (userAllEntries.length > 1) {
      user = userAllEntries[0];

      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [
          { phone, accountVerified: false },
          { email, accountVerified: false },
        ],
      });
    } else {
      user = userAllEntries[0];
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });

    generateToken(user, res);
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error.", 500));
  }
});

export const editProfile = catchAsyncErrors(async (req, res, next) => {
  const { profileImage } = req.files;
  let cloudinaryResponse;

  if (profileImage) {
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(profileImage.mimetype)) {
      return next(new ErrorHandler("File format not supported.", 400));
    }
    cloudinaryResponse = await uploadImage(
      profileImage,
      "Failed to upload profile image"
    );
  }

  const {
    userName,
    address,
    role,
    bankAccountNumber,
    bankAccountName,
    bankName,
    paypalEmail,
  } = req.body;

  if (!bankAccountName || !bankAccountNumber || !bankName) {
    return next(
      new ErrorHandler("Please provide your full bank details.", 400)
    );
  }

  if (!paypalEmail) {
    return next(new ErrorHandler("Please provide your paypal email.", 400));
  }

  const isRegistered = await User.findOne({ email });

  if (isRegistered && isRegistered._id.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("Email is already registered by another user.", 400)
    );
  }

  const updatedData = {
    userName,
    address,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankAccountName,
        bankName,
      },
      paypal: {
        paypalEmail,
      },
    },
  };

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, {
    new: true,
  }).select("-password");

  if (!updatedUser) {
    return next(new ErrorHandler("User not found.", 404));
  }

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill full form."));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid credentials.", 400));
  }

  generateToken(user, res);
});

export const getProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("accessToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .cookie("refreshToken", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Successfully.",
    });
});

export const refresh = catchAsyncErrors(async (req, res, next) => {
  try {
    const refreshToken =
      req.cookies.refreshToken || req?.headers?.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(401).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }

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

    const user = await User.findById(verifyToken?._id);
    refreshAccessToken(user, res);
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
});

export const fetchLeaderboard = catchAsyncErrors(async (req, res, next) => {
  const leaderboard = await User.find({ moneySpent: { $gt: 0 } }).sort({
    moneySpent: -1,
  });
  res.status(200).json({
    success: true,
    leaderboard,
  });
});

export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const resetToken = user.generateResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/auth/password/reset/${resetToken}`;

  const message = `Your Reset Password Token is:- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it.`;

  try {
    sendEmail({
      email: user.email,
      subject: "MERN AUTHENTICATION APP RESET PASSWORD",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler(
        error.message ? error.message : "Cannot send reset password token.",
        500
      )
    );
  }
});

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or has been expired.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password & confirm password do not match.", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, "Reset Password Successfully.", res);
});
