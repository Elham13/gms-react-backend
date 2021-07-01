const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Plan", PlanSchema);
