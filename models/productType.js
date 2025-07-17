import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  has_stock: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model("ProductType", productTypeSchema);
