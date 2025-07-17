import mongoose from "mongoose";
import baseModel from "../utils/baseModel.js";

const promoSchema = new mongoose.Schema({
  ...baseModel,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  days_of_week: [
    {
      type: String,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  ],
  products_quantity: {
    type: Number,
    default: 1,
  },
  on_landing: {
    type: Boolean,
    default: false,
  },
  specific_date: {
    type: Date,
    index: true,
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Price",
    required: true,
  },
  product_list: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }],
});

export default mongoose.model("Promo", promoSchema);
