import mongoose from "mongoose";
import baseModel from "../utils/baseModel.js";

const imageSchema = new mongoose.Schema({
  ...baseModel,
  image_url: {
    type: String,
    required: true
  },
  is_main: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Image", imageSchema);
