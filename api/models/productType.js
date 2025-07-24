import mongoose from "mongoose";

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
    validate: {
      validator: async function (value) {
        const existing = await mongoose.models.ProductType.findOne({
          name: new RegExp(`^${value}$`, "i"),
        });
        return !existing || existing._id.equals(this._id);
      },
      message: "The name must be unique (case-insensitive).",
    },
  },
  has_stock: {
    type: Boolean,
    default: true,
  },
});

productTypeSchema.path("name").validate({
  validator: async function (value) {
    const existing = await mongoose.models.ProductType.findOne({
      name: new RegExp(`^${value}$`, "i"), // insensitive regex
    });
    return !existing || existing._id.equals(this._id);
  },
  message: "The name must be unique (case-insensitive).",
});

export default mongoose.model("ProductType", productTypeSchema);
