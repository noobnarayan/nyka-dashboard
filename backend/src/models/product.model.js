import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: "string", required: true, minLength: 1, maxLength: 50 },
    picture: { type: "string", required: false },
    description: { type: "string", required: true },
    gender: { type: "string", required: true, enum: ["male", "female"] },
    category: {
      type: "string",
      required: true,
      enum: ["makeup", "skincare", "haircare"],
    },
    price: { type: "number", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Product = mongoose.model("Product", productSchema);
