import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  promo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promo"
  },
  amount: {
    type: mongoose.Types.Decimal128,
    required: true,
    min: 0.01,
    max: 1000000.0,
  },
  is_current: {
    type: Boolean,
    default: false
  },
});

priceSchema.pre("validate", function (next) {
  if ((this.product && this.promo) || (!this.product && !this.promo)) {
    return next(
      new Error("Either product or promo must be set, but not both.")
    );
  }
  next();
});

export default mongoose.model("Price", priceSchema);
