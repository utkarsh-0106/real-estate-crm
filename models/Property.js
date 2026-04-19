const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: String,
    location: String,
    price: Number,
    type: String, // residential / commercial
    status: {
        type: String,
        default: "Available"
    }
});

module.exports = mongoose.model("Property", propertySchema);