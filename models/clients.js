const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    brags: String,
    photo: {},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);
