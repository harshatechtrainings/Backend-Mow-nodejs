/** @format */
const BookingDetails = require("../models/BookingEffective");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const mongoose = require("mongoose");

const bookVehicle = (req, res) => {
  const sample = {
    user: {
      name: "John Doe",
      email: "john@example.com",
      mobileNumber: "1234567890",
      area: "City Center",
      vehicleType: "Sedan",
      acers: 2,
      dateBooked: "2023-01-15",
      startTime: "10:00 AM",
    },
    driver: {
      vehicleNo: "ABC123",
      name: "Driver Name",
      email: "driver@example.com",
      number: "9876543210",
      startTime: "9:30 AM",
      endTime: "6:00 PM",
      status: "Accepted",
    },
    booking: {
      amount: "50",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
      uniqueCode: "ABC123XYZ",
      delayReason: null,
      lastUpdated: "2023-01-14T15:30:00Z",
    },
  };

  // Creating a booking
  const newBooking = new BookingDetails(sample);

  newBooking
    .save()
    .then((result) => {
      console.log("Booking saved:", result);
      res.status(201).json({ message: StatusMessage.SUCCESS });
    })
    .catch((error) => {
      console.error("Error saving booking:", error);
      res.status(500).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
    });
};

const updateDetails = (req, res) => {
  // Example: Update user's name
  const bookingIdToUpdate = "658e5e2cfabaa4fcdde58f15"; // Replace with the actual booking ID
  //   const userIdToUpdate = "658e62d8b5eb3823ce37b70f"; // Replace with the actual user ID

  // Update query
  const updateQuery = {
    _id: bookingIdToUpdate,
    // "user._id": userIdToUpdate, // Use the correct path to the user sub-document
  };

  // Updated data
  const updatedUserData = {
    $set: {
      driver: {
        vehicleNo: "ABC123",
        name: "Driver Name",
        email: "driver@example.com",
        number: "9876543210",
        startTime: "9:30 AM",
        endTime: "6:00 PM",
        status: "Accepted",
      },
    },
  };

  // Update the user's name within the BookingDetails document
  BookingDetails.updateOne(updateQuery, updatedUserData)
    .then((result) => {
      console.log("Update result:", result);
      res.status(201).json({ message: StatusMessage.SUCCESS });
    })
    .catch((error) => {
      console.error("Update error:", error);
      res.status(500).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
    });
};

const getAllBookings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 2;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const totalCount = await BookingDetails.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;

    // const sortBy = req.query.sortBy || "_id"; // Default to sorting by _id
    // const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // .sort({ [sortBy]: sortOrder }) // Sort based on the provided field and order. Add this to query
    const bookings = await BookingDetails.find().skip(skip).limit(pageSize);
    /** implement authenticate before fetching the users */
    //api localhost:3000/api/data?page=1&pageSize=10 for above implementation
    // const bookings = await BookingDetails.find();
    return res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { bookings },
      page,
      pageSize,
      totalPages,
      totalCount,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
      data: { error },
    });
    // res.status(500).json({ error: StatusMessage.INTERNAL_SERVER_ERROR });
  }
};

module.exports = { bookVehicle, updateDetails, getAllBookings };
