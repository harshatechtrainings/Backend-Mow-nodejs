/** @format */
const BookingDetails = require("../models/BookingEffective");
const { StatusMessage } = require("../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const mongoose = require("mongoose");
const randomatic = require("randomatic");

const bookVehicle = (req, res) => {
  /* 	#swagger.tags = ['Book']
        #swagger.description = 'Endpoint to Create booking' */

  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/bookVehicle"
                    }  
                }
            }
        } 
    */
  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  const {
    name,
    email,
    mobileNumber,
    area,
    vehicleType,
    acers,
    dateBooked,
    startTime,
    endTime,
    estimatedAmount,
  } = req.body.user;

  const bookingDateTime = Date.now();

  /** Check if user exists first. And ftech all user information */
  /** IF user exists below should execute */
  /**
       * let startingTime = [];
            let startingcount = [];
            let totalStartTime = [];
            let totalStartCount = [];
            let useracers = [];
            let userhours = [];

            let countinuecount = 0;

            let acerscheck, vehiclecount, lenuseracers;
            /** fetch vehicles count in there location for vcount and vchaincount */
  /**
            if (vehicleType === 'MOWWHEEL') {
              acerscheck = 0;
              vehiclecount = vcount;
              lenuseracers = acers;
            } else if (vehicleType === 'MOWCHAIN') {
              acerscheck = 2;
              vehiclecount = vchaincount';
              lenuseracers = acers * 2;
            }

            for (let i = 0; i < lenuseracers; i++) {
              userhours.push(startTime);
              startTime++;
              // modify this; this will result in entering data to db wrongly
            }

            browse fom DB with the abve values
            const collection = database.collection('user_bookings');

    const res1 = await collection.aggregate([
      {
        $match: {
          area: area,
          dateBooked: dateBooked,
          vehicleType: vehicleType,
        },
      },
      {
        $group: {
          startTime: startTime,
          startTCount: { $sum: 1 },
          acers: { $first: acers },
        },
      },
    ]).toArray();

    const rowcounts = res1.length;

    if (rowcounts > 0) {
      res1.forEach((user) => {
        startingTime.push(user.startTime);
        startingcount.push(user.startTCount);
        useracers.push(user.acers);
      });

      for (let x = 0; x < rowcounts; x++) {
        for (let y = 0; y < useracers[x] + acerscheck; y++) {
          totalStartTime.push(startingTime[x]);
          totalStartCount.push(startingcount[x]);
          startingTime[x]++;
        }
      }

      const newlength = totalStartTime.length;
      const unset = [];

      for (let i = 0; i < newlength; i++) {
        for (let j = i + 1; j < newlength; j++) {
          if (totalStartTime[i] === totalStartTime[j]) {
            if (totalStartCount[i] !== -1) {
              totalStartCount[i] += totalStartCount[j];
              unset.push(j);
            }
          }
        }
      }

      for (let u = 0; u < unset.length; u++) {
        if (u === 0) {
          totalStartTime.splice(unset[u], 1);
          totalStartCount.splice(unset[u], 1);
        } else {
          totalStartTime.splice(unset[u] - 1, 1);
          totalStartCount.splice(unset[u] - 1, 1);
        }
      }

      const nLenAfterSort = totalStartTime.length;

      for (let j = 0; j < nLenAfterSort; j++) {
        for (let k = 0; k < lenuseracers; k++) {
          if (totalStartTime[j] === userhours[k]) {
            if (totalStartCount[j] >= vehiclecount) {
              countinuecount++;
            }
          }
        }
      }
    }


    //check is completed, below we have to insert the data
    if (countinuecount > 0) {
      errors.push(22);
    } else {
      // Actually create the account
      const uniqueID = generateUniqueId(); // Implement a function to generate unique IDs
      const userBookingsCollection = database.collection('user_bookings');
      const udbBookingDetailsCollection = database.collection('udb_booking_details');

      const id = await userBookingsCollection.insertOne({
        Uname,
        Ugmail,
        UMobile_number,
        UState,
        UDistrict,
        UArea,
        UVehicles,
        Uacres,
        Udate,
        UserTime,
        UEtime,
        UAmount,
        uniqueID,
        C_updated,
      });

      const id1 = await udbBookingDetailsCollection.insertOne({
        Uname,
        Ugmail,
        UMobile_number,
        UArea,
        UVehicles,
        Uacres,
        Udate,
        UserTime,
        Booked,
        uniqueID,
        C_updated,
      });

      if (id.result.ok === 1 && id1.result.ok === 1) {
        const err = await sendBookingMail(Uname, Ugmail, UMobile_number, UArea, UVehicles, Uacres, Udate, UTime, uniqueID);
        
        if (err === 0) {
          errors.push(0);
        } else {
          errors.push(err + 9);
        }
      } else {
        // Failed to insert into the database
        errors.push(6);
      }
    }



       */

  // const sample = {
  //   user: {
  //     name: "John Doe",
  //     email: "john@example.com",
  //     mobileNumber: "1234567890",
  //     area: "City Center",
  //     vehicleType: "Sedan",
  //     acers: 2,
  //     dateBooked: "2023-01-15",
  //     bookingTime: "10:00 AM",
  //      startTime:"10:00 AM"
  // endTime: "6:00 PM",
  //     estimatedAmount:"2000"
  //   },
  //   driver: {
  //     vehicleNo: "ABC123",
  //     name: "Driver Name",
  //     email: "driver@example.com",
  //     number: "9876543210",
  //     startTime: "9:30 AM",
  //     endTime: "6:00 PM",
  //     status: "Accepted",
  //   },
  //   booking: {
  //     amount: "50",
  //     paymentStatus: "Pending",
  //     paymentMethod: "Credit Card",
  //     uniqueCode: "ABC123XYZ",
  //     delayReason: null,
  //     lastUpdated: "2023-01-14T15:30:00Z",
  //   },
  // };

  const RandomId = randomatic("Aa0", Math.floor(Math.random() * (10 - 8 + 1)) + 8);

  const bookingid = "MOW" + RandomId;
  const { user } = req.body;
  user.bookingTime = bookingDateTime;
  console.log(user);
  const data = { bookingId: bookingid, user: user };
  console.log(data);
  // Creating a booking
  const newBooking = new BookingDetails(data);

  newBooking
    .save()
    .then((result) => {
      res.status(201).json({ message: StatusMessage.SUCCESS });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
    });
};

const updateDetails = (req, res) => {
  /* 	#swagger.tags = ['Book']
        #swagger.description = 'Endpoint to Update booking' */

  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/bookingUpdate"
                    }  
                }
            }
        } 
    */
  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  // Example: Update user's name
  const bookingIdToUpdate = req.params.bookingId; // Replace with the actual booking ID

  // Update query
  const updateQuery = {
    bookingId: bookingIdToUpdate,
    // "user._id": userIdToUpdate, // Use the correct path to the user sub-document
  };

  const { driver } = req.body;
  // Updated data
  const updatedUserData = {
    $set: {
      driver,
    },
  };

  // Update the user's name within the BookingDetails document
  BookingDetails.updateOne(updateQuery, updatedUserData)
    .then((result) => {
      console.log("Update result:", result);
      res
        .status(StatusCodes.CREATED)
        .json({ status: ReasonPhrases.CREATED, message: StatusMessage.SUCCESS, data: {} });
    })
    .catch((error) => {
      console.error("Update error:", error);
      res.status(500).json({ message: StatusMessage.INTERNAL_SERVER_ERROR });
    });
};

const getAllBookings = async (req, res) => {
  /* 	#swagger.tags = ['Book']
        #swagger.description = 'Fetch all booking' */

  /* #swagger.security = [{
            "bearerAuth": []
    }] */

  /*  #swagger.parameters['page'] = {
            in: 'query',
            description: 'Some description...',
            type: 'number'
    } */
  /*  #swagger.parameters['pageSize'] = {
            in: 'query',
            description: 'Some description...',
            type: 'number'
    } */
  try {
    const page = parseInt(req.query.page) || 2;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const totalCount = await BookingDetails.countDocuments();
    const totalPages = Math.ceil(totalCount / pageSize);
    const skip = (page - 1) * pageSize;

    // const sortBy = req.query.sortBy || "_id"; // Default to sorting by _id
    // const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;

    // .sort({ [sortBy]: sortOrder }) // Sort based on the provided field and order. Add this to query
    const bookings = await BookingDetails.find().skip(skip).limit(pageSize);
    /** implement authenticate before fetching the users */
    //api localhost:3000/api/data?page=1&pageSize=10 for above implementation
    //localhost:3000/api/data?page=1&pageSize=10&sortBy=name&sortOrder=desc
    // const bookings = await BookingDetails.find();
    http: return res.status(StatusCodes.OK).json({
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
