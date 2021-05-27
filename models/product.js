const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    Title: String,
    Category: String,
    Description: String,
    Price: Number,
    Images: [{}],
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ProductModal", ProductSchema);
