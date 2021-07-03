const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    User: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    Category: String,
    Description: String,
    Price: { type: Number, required: true },
    Images: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ProductModal", ProductSchema);
