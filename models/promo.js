import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
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
    default: 1
  },
  on_landing: {
    type: Boolean,
    default: false
  },
  specific_date: {
    type: Date,
    index: true
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
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

export default mongoose.model("Promo", promoSchema);
