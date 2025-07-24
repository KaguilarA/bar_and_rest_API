import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: [{
    type: String,
    enum: ["users", "business", "menu items", "cart"],
    required: true
  }],
});

export default mongoose.model("State", stateSchema);
