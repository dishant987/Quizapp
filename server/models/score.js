import mongoose, { Schema, model } from "mongoose";

const Score = new Schema(
  {
    result: { type: Array, default: [] },
    points: { type: Number, default: 0 },
    achived: { type: String, default: "" },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("Score", Score);
