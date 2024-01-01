/** @format */

const PilotRegistration = require("../../models/pilot/pilot");
const { StatusMessage } = require("../../utils/statusMessage");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const PilotAccess = require("../../models/pilot/pilotaccess");
const randomatic = require("randomatic");
const bcrypt = require("bcrypt");

const registerPilot = async (req, res) => {
  /* 	#swagger.tags = ['Pilot']
        #swagger.description = 'Endpoint to create register by pilot' */
  try {
    const pilotRegistration = new PilotRegistration(req.body);
    const savedPilotRegistration = await pilotRegistration.save();
    res.status(201).json(savedPilotRegistration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePilotRegistrationByAdmin = async (req, res) => {
  /* 	#swagger.tags = ['Pilot']
        #swagger.description = 'Endpoint to update pilot registration by admin' */
  try {
    const { id } = req.params;
    const { admin } = req.body;

    const updatedPilotRegistration = await PilotRegistration.findByIdAndUpdate(
      id,
      {
        $set: { admin },
      },
      { new: true }
    );

    if (!updatedPilotRegistration) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: ReasonPhrases.NOT_FOUND,
        message: StatusMessage.USER_NOT_FOUND,
        error: "Pilot registration not found",
      });
    }

    createPilotAccess(req, res, updatedPilotRegistration);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
      data: { error },
    });
  }
};

const createPilotAccess = async (req, res, updatedPilotRegistration) => {
  const randomPassword = randomatic("Aa0", Math.floor(Math.random() * (10 - 8 + 1)) + 8);
  console.log(randomPassword);
  const hashedPassword = await bcrypt.hash(randomPassword, 10);

  const access = {
    fullname: updatedPilotRegistration.pilot.Name,
    username: updatedPilotRegistration.pilot.Gmail,
    password: hashedPassword,
    created: Date.now(),
    pilottype: updatedPilotRegistration.pilot.VehicleType,
  };

  try {
    // Create a new document using pilotAccessSchema
    const newPilotAccess = new PilotAccess(access);
    await newPilotAccess.save();
    res.status(StatusCodes.OK).json({
      status: ReasonPhrases.OK,
      message: StatusMessage.SUCCESS,
      data: { newPilotAccess },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: ReasonPhrases.INTERNAL_SERVER_ERROR,
      message: StatusMessage.INTERNAL_SERVER_ERROR,
      data: { error },
    });
  }
};

module.exports = { registerPilot, updatePilotRegistrationByAdmin };
