import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true
  },
  is_main: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model("Image", imageSchema);
