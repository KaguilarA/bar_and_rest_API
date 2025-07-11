import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  promo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Promo"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  image_url: {
    type: String,
    required: true
  },
  is_main: {
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
});

imageSchema.pre("validate", function (next) {
  const setFields = [this.product, this.promo, this.user].filter(Boolean);
  if (setFields.length !== 1) {
    return next(
      new Error("Exactly one of product, promo, or user must be set.")
    );
  }
  next();
});

export default mongoose.model("Image", imageSchema);
