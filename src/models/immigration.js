const { model, Schema } = require("mongoose");

const ImmigrationSchema = new Schema({
    employeeId: String,
    visaStatus: String,
    visaValidity: { type: Date, default: Date.now },
    entryDate: { type: Date, default: Date.now },
    receiptNumber: [String],
    currentLocation: String,
    i94Number: String,
    i94ExpireDate: { type: Date, default: Date.now },
    passportNumber: String,
    passportExpireDate: { type: Date, default: Date.now },
    resources: String,
})

module.exports = model("Immigration", ImmigrationSchema); 