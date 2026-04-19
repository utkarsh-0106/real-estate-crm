const express = require("express");
const mongoose = require("mongoose");

// ✅ FIRST create app
const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/crm")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// ✅ Model
const Lead = require("./models/Lead");

// ✅ Routes (AFTER app is created)
app.post("/api/leads", async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        res.json(lead);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/leads", async (req, res) => {
    try {
        const leads = await Lead.find();
        res.json(leads);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const Property = require("./models/Property");

// ✅ Create Property
app.post("/api/properties", async (req, res) => {
    try {
        const property = await Property.create(req.body);
        res.json(property);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get Properties
app.get("/api/properties", async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


const Deal = require("./models/Deal");

// ✅ Create Deal
app.post("/api/deals", async (req, res) => {
    try {
        const deal = await Deal.create(req.body);
        res.json(deal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Get Deals (with populated data 🔥)
app.get("/api/deals", async (req, res) => {
    try {
        const deals = await Deal.find()
            .populate("leadId")
            .populate("propertyId");

        res.json(deals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ Update Deal Stage
app.put("/api/deals/:id", async (req, res) => {
    try {
        const deal = await Deal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(deal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get("/api/dashboard", async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();
        const totalProperties = await Property.countDocuments();
        const totalDeals = await Deal.countDocuments();
        const closedDeals = await Deal.countDocuments({ stage: "Closed" });

        res.json({
            totalLeads,
            totalProperties,
            totalDeals,
            closedDeals
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const path = require("path");

app.use(express.static("public"));

// ✅ Test route
app.get("/ping", (req, res) => {
    res.send("pong");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});