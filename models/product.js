import mongoose from "mongoose";
import baseModel from "../utils/baseModel.js";

const productSchema = new mongoose.Schema({
  ...baseModel,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  on_landing: {
    type: Boolean,
    default: false,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Price"
  }],
});

export default mongoose.model("Product", productSchema);
