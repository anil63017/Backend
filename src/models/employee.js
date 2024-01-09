const { Schema, model } = require("mongoose");
const { EMP_STATUS } = require("../util/enums");

const employeeSchema = new Schema({
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: String,
  lastName: String,
  phone: String,
  email: {
    type: String,
    unique: true,
    lowercase: true,

  },
  entryDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [...Object.values(EMP_STATUS)],
    defaultValue: EMP_STATUS.ACTIVE,
  },
  onBoarding: { type: Boolean, defaultValue: false },
  eVerifyStatus: { type: String, enum: [...Object.values(EMP_STATUS)] },
  eVerifyDocs: { type: String },
  i9Status: { type: String, enum: [...Object.values(EMP_STATUS)] },
  i9Docs: { type: String },
  address: { type: String, defaultValue: '' },
  street: { type: String, defaultValue: '' },
  city: { type: String, defaultValue: '' },
  state: { type: String, defaultValue: '' },
  zip: { type: String, defaultValue: '' },
}, { timestamps: true })

module.exports = model("Employee", employeeSchema); 