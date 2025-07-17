import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  promo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promo"
  },
  quantity: {
    type: Number,
    default: 1
  },
  unit_price: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0.01
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true
  },
}, {
  _id: false
});

cartItemSchema.pre("validate", function (next) {
  if ((this.product && this.promo) || (!this.product && !this.promo)) {
    return next(new Error("Only one of product or promo should be set."));
  }
  next();
});

export default mongoose.model("CartItem", cartItemSchema);
