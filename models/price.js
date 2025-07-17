import mongoose from "mongoose";

const priceSchema = new mongoose.Schema({
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

export default mongoose.model("Price", priceSchema);
