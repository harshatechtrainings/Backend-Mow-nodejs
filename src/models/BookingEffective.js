/** @format */

const mongoose = require("mongoose");

// Sub-schema for User Information
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  area: { type: String, required: true },
  vehicleType: { type: String, required: true },
  acers: { type: Number, required: true },
  dateBooked: { type: Date, required: true }, // on which date they want service
  bookingTime: { type: String, required: false }, // booking created date
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  estimatedAmount: { type: String, required: true },
});

// Sub-schema for Driver Information
const driverSchema = new mongoose.Schema({
  vehicleNo: { type: String, required: false },
  name: { type: String, required: false },
  email: { type: String, required: false },
  number: { type: String, required: false }, //MobileNumber
  startTime: { type: String, required: false },
  endTime: { type: String, required: false },
  status: { type: String, required: false },
});

// Sub-schema for Booking Details
const bookingSchema = new mongoose.Schema({
  amount: { type: String, required: false },
  paymentStatus: { type: String, required: false },
  paymentMethod: { type: String, required: false },
  uniqueCode: { type: String, required: false },
  delayReason: { type: String, required: false },
  lastUpdated: { type: Date, required: false },
});

// Main Booking Details Schema
const bookingDetailsSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: userSchema, // Embed user sub-schema
    driver: driverSchema, // Embed driver sub-schema
    booking: bookingSchema, // Embed booking sub-schema
  },
  { collection: "udb_booking_details" }
);

const BookingDetails = mongoose.model("BookingDetails", bookingDetailsSchema);

module.exports = BookingDetails;
