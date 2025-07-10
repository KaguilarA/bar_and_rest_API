import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  password_hash: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
    index: true,
  },
});

export default mongoose.model("User", userSchema);
