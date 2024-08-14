const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {  
  try {
    const { name, email, password } = req.body;

    console.log("req.body", req.body);

    if (!name) {
      throw new Error("Please Provide Name");
    }

    if (!email) {
      throw new Error("Please Provide Email");
    }

    if (!password) {
      throw new Error("Please Provide Password");
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      throw new Error("Email already exists. Please use a different email.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong while hashing the password.");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);

    const savedUser = await userData.save();

    res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      message: error.message,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
