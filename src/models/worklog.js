const { Schema, model } = require("mongoose");
const { JOB_TYPE, WORK_LOCATION } = require("../util/enums");

const workSchema = new Schema({
    entryDate: { type: Date, default: Date.now },
    employeeId: String,
    vendorId: String,
    clientId: String,
    position: String,
    projectStatus: String,
    workLocation: { type: String, enums: [...Object.values(WORK_LOCATION)] },
    startDate: { type: Date, deafult: Date.now },
    endDate: { type: Date, deafult: Date.now },
    jobType: { type: String, enums: [...Object.values(JOB_TYPE)] },
}, { timestamps: true })

module.exports = model("WorkLog", workSchema); 