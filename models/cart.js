import mongoose from "mongoose";
import baseModel from "../utils/baseModel.js";

const cartSchema = new mongoose.Schema({
  ...baseModel,
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  cart_items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CartItem",
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
