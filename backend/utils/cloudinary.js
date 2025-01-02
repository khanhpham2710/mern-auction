import { v2 as cloudinary } from "cloudinary";
import ErrorHandler from "../middlewares/error.js";

export const uploadImage = async (image, errorMessage) => {
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

  if (!allowedFormats.includes(image.mimetype)) {
    return next(new ErrorHandler("Image format not supported.", 400));
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    image.tempFilePath,
    {
      folder: "MERN_AUCTION_PAYMENT_PROOFS",
    }
  );

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error."
    );
    return next(new ErrorHandler(errorMessage, 500));
  }
}