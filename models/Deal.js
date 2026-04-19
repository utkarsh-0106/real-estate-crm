const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead"
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property"
    },
    stage: {
        type: String,
        default: "Inquiry" // Inquiry → Negotiation → Closed
    },
    commission: Number
});

module.exports = mongoose.model("Deal", dealSchema);