import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  description: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  },
  on_landing: {
    type: Boolean,
    default: false
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_updated: {
    type: Date
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
    index: true,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductType",
    required: true,
    index: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
});

export default mongoose.model("Product", productSchema);
