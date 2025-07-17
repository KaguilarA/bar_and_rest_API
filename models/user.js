import mongoose from "mongoose";
import baseModel from "../utils/baseModel.js";

const userSchema = new mongoose.Schema(
  {
    ...baseModel,
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
        required: true,
      },
    ],
    permission_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
        required: true,
      },
    ],
  },
  {
    virtuals: {
      fullName: {
        get() {
          return `${this.name} ${this.lastname || ""}`.trim();
        },
      },
      toJSON: {
        virtuals: true,
      },
    },
  }
);

export default mongoose.model("User", userSchema);
