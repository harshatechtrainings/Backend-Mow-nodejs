/** @format */

const mongoose = require("mongoose");

// Schema for pilot_registration table
const pilotRegistrationSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Gmail: { type: String, required: true },
  DOB: { type: Date, default: null },
  MobileNumber: { type: String, required: true },
  VehicleNo: { type: String, required: true },
  VehicleType: { type: String, required: true },
  vehicleOwnerName: { type: String, required: true },
  vehicleDriverName: { type: String, required: true },
  Address: { type: String, required: true },
  File: { type: String, required: true },
  CreatedDate: { type: Date, default: null },
  regStatus: { type: String, default: null },
});

// Schema for admin_rfp table with common columns removed
const adminRfpSchema = new mongoose.Schema({
  vehicleCompanyCode: { type: String, required: true },
  RelocationArea: { type: String, required: true },
  RelocationAreaCode: { type: String, required: true },
  CreatedDate: { type: Date, default: null },
  RelocationDistrict: { type: String, required: true },
  RelocationState: { type: String, required: true },
  LastUpdated: { type: Date, default: null },
});


const pilotAdminSchema = new mongoose.Schema(
  {
    pilot: pilotRegistrationSchema, // Embed user sub-schema
    admin: adminRfpSchema, // Embed driver sub-schema
  },
  { collection: "PilotRegistration" }
);

const PilotRegistration = mongoose.model("PilotRegistration", pilotAdminSchema);

module.exports = PilotRegistration;
