import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  images_base_url: {
    type: String
  },
  instagram_url: {
    type: String
  },
  facebook_url: {
    type: String
  },
  whatsapp_url: {
    type: String
  },
  twitter_url: {
    type: String
  },
  state: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: true,
    index: true,
  },
});

export default mongoose.model("Business", businessSchema);
