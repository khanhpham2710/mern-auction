import mongoose from "mongoose";
import { deleteImage } from "../utils/cloudinary";

const auctionSchema = new mongoose.Schema({
  title: String,
  description: String,
  startingBid: Number,
  category: String,
  condition: {
    type: String,
    enum: ["New", "Used"],
  },
  currentBid: { type: Number, default: 0 },
  startTime: String,
  endTime: String,
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bids: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
      },
      userName: String,
      profileImage: String,
      amount: Number,
    },
  ],
  highestBidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  commissionCalculated: {
    type: Boolean,
    default: false,
  },
}, {
    timestamps: true
});

auctionSchema.pre("delete", async function () {
  const id = this.image.public_id;
  await deleteImage(id, "Error delete image on cloudinary")
});

export const Auction = mongoose.model("Auction", auctionSchema);