const { Schema, model } = require("mongoose")

const clientSchema = new Schema({
    entryDate: { type: Date, default: Date.now },
    name: String,
    state: String,
    address: { type: String, defaultValue: '' },
    street: { type: String, defaultValue: '' },
    city: { type: String, defaultValue: '' },
    state: { type: String, defaultValue: '' },
    zip: { type: String, defaultValue: '' },
    pocName: String,
    pocEmail: String,
    contact: String,
}, { timestamps: true })

module.exports = model("Client", clientSchema); 