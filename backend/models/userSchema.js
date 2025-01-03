import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      minLength: [3, "Username must caontain at least 3 characters."],
      maxLength: [40, "Username cannot exceed 40 characters."],
    },
    password: {
      type: String,
      selected: false,
      minLength: [8, "Password must caontain at least 8 characters."],
    },
    email: String,
    address: String,
    phone: {
      type: String,
      minLength: [11, "Phone Number must caontain exact 11 digits."],
      maxLength: [11, "Phone Number must caontain exact 11 digits."],
    },
    profileImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber: String,
        bankAccountName: String,
        bankName: String,
      },
      paypal: {
        paypalEmail: String,
      },
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User"
    },
    unpaidCommission: {
      type: Number,
      default: 0,
    },
    auctionsWon: {
      type: Number,
      default: 0,
    },
    moneySpent: {
      type: Number,
      default: 0,
    },
    phone: String,
    accountVerified: { type: Boolean, default: false },
    verificationCode: Number,
    verificationCodeExpire: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerificationCode = function () {
  function generateRandomFiveDigitNumber() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);

    return parseInt(firstDigit + remainingDigits);
  }
  const verificationCode = generateRandomFiveDigitNumber();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000;

  return verificationCode;
};

userSchema.methods.generateJsonWebToken = function () {

  const accessToken = jwt.sign(
    { id: this._id },
    process.env.ACCESS_JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_JWT_EXPIRE * 60 * 60 * 1000,
    }
  );
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.REFRESH_JWT_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRE,
    }
  );

  return { accessToken, refreshToken };
};

userSchema.methods.refreshToken = function () {
  return (accessToken = jwt.sign(
    { id: this._id },
    process.env.ACCESS_JWT_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_JWT_EXPIRE,
    }
  ));
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export const User = mongoose.model("User", userSchema);
