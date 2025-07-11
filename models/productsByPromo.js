import mongoose from "mongoose";

const productsByPromosSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  promo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promo",
    required: true
  },
});

export default mongoose.model("ProductsByPromo", productsByPromosSchema);
