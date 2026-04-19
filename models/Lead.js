const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    budget: Number,
    status: {
        type: String,
        default: "New"
    }
});

module.exports = mongoose.model("Lead", leadSchema);