const mongoose = require("mongoose");

const connectDB = mongoose.connect("mongodb://localhost/MERN-ECOMMERCE");

module.exports = connectDB;