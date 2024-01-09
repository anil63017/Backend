const { Schema, model } = require("mongoose")

const vendorSchema = new Schema({
    entryDate: { type: Date, default: Date.now },
    name: String,
    address: { type: String, defaultValue: '' },
    street: { type: String, defaultValue: '' },
    city: { type: String, defaultValue: '' },
    state: { type: String, defaultValue: '' },
    zip: { type: String, defaultValue: '' },
    pocEmail: String,
    pocName: String,
    pocContact: String,
    invoiceEmail: String,
    pmtTerms: String,
    invoiceTerms: String,
    timeSheets: String,
}, { timestamps: true })

module.exports = model("Vendor", vendorSchema); 