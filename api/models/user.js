import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
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
        ref: "Images"
      },
    ],
    permission_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
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
    timestamps: true
  }
);

export default mongoose.model("User", userSchema);
