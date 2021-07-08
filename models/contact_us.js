const mongoose = require("mongoose");

const ContactScema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    MobileNumber: Number,
    Email: String,
    Message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ContactModal", ContactScema);
