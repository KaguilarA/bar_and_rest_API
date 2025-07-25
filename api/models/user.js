import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: String,
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
    timestamps: true,
  }
);

/**
 * Pre-save: encripta la contraseña SOLO al crear
 */
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      this.password_hash = await bcrypt.hash(this.password_hash, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

/**
 * Pre-update: encripta la contraseña si es actualizada
 */
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.password_hash) {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      update.password_hash = await bcrypt.hash(update.password_hash, salt);
      this.setUpdate(update);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

export default mongoose.model("User", userSchema);
