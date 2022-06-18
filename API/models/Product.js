const mongoose = require("mongoose");


const ProductSchema = new mongoose.Schema(
    {
    titel:{type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    img: {type: String, required: true},
    categories: {type: Array},
    color: {type: Array},
    size: {type: Array},
    inStock: {type: Boolean, default: true},
    },
    { timestamps: true}
);

module.exports = mongoose.model("Product", ProductSchema);