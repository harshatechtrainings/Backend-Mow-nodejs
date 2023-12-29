/** @format */

const mongoose = require("mongoose");

const udbBookingDetailsSchema = new mongoose.Schema(
  {
    UBD_NAME: { type: String, required: true },
    UBD_Gmail: { type: String, required: true },
    UBD_MobileNumber: { type: String, required: true },
    UBD_Area: { type: String, required: true },
    UBD_VehicleType: { type: String, required: true },
    UBD_Acers: { type: Number, required: true },
    UBD_DateBooked: { type: Date, required: true },
    UBD_StartTime: { type: String, required: false },
    UDB_VehicleNo: { type: String, required: false },
    UDB_DriverName: { type: String, required: false },
    UDB_Gmail: { type: String, required: false },
    UDB_DriverNumber: { type: String, required: false },
    UDB_StartTime: { type: String, required: false },
    UDB_EndTime: { type: String, required: false },
    UDB_status: { type: String, required: false },
    UBD_Amount: { type: String, required: false },
    UBD_Payment_Status: { type: String, required: false },
    UBD_Payment_Method: { type: String, required: false },
    UBD_UNIQUECODE: { type: String, required: false },
    UDB_DELAY_Reason: { type: String, required: false },
    UDB_LastUpdated: { type: Date, required: false },
  },
  { collection: "udb_booking_details" }
);

const UdbBooking = mongoose.model("UdbBookings", udbBookingDetailsSchema);

module.exports = UdbBooking;


const mongoose = require("mongoose");

const bookingDetailsSchema = new mongoose.Schema(
  {
    // User Information
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userMobileNumber: { type: String, required: true },
    userArea: { type: String, required: true },
    userVehicleType: { type: String, required: true },
    userAcers: { type: Number, required: true },
    userDateBooked: { type: Number, required: true },
    userStartTime: { type: String, required: false },

    // Driver Information
    driverVehicleNo: { type: String, required: false },
    driverName: { type: String, required: false },
    driverEmail: { type: String, required: false },
    driverNumber: { type: String, required: false },
    driverStartTime: { type: String, required: false },
    driverEndTime: { type: String, required: false },
    driverStatus: { type: String, required: false },

    // Booking Details
    bookingAmount: { type: String, required: false },
    paymentStatus: { type: String, required: false },
    paymentMethod: { type: String, required: false },
    uniqueCode: { type: String, required: false },
    delayReason: { type: String, required: false },
    lastUpdated: { type: Number, required: false },
  },
  { collection: "udb_booking_details" }
);

const BookingDetails = mongoose.model("BookingDetails", bookingDetailsSchema);

module.exports = BookingDetails;
