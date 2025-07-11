import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  },
});

export default mongoose.model("Cart", cartSchema);
