import mongoose from "mongoose";

const permissionByUserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    permission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  { _id: false }
);

permissionByUserSchema.index({ user: 1, permission: 1 }, { unique: true });

export default mongoose.model("PermissionByUser", permissionByUserSchema);
