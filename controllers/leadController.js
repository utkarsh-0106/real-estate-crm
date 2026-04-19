const Lead = require("../models/Lead");
exports.createLead = async (req, res) => {
    try {
        console.log("POST /leads hit");

        const lead = await Lead.create(req.body);

        return res.status(201).json(lead);
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({ error: error.message });
    }
};

exports.getLeads = async (req, res) => {
    try {
        console.log("GET /leads hit");

        const leads = await Lead.find();

        console.log("Leads fetched:", leads.length);

        return res.status(200).json(leads);
    } catch (error) {
        console.error("ERROR:", error);
        return res.status(500).json({ error: error.message });
    }
};

exports.updateLead = async (req, res) => {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
};

exports.deleteLead = async (req, res) => {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};