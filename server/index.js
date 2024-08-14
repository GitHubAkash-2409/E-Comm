const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const connectDB = require("./config/db");
const router = require('./routes');

const app = express();

app.use(cookieParser())

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true  
}));


// Middleware to parse JSON bodies
app.use(express.json());

// Register routes
app.use("/api", router);

// Retrieve the port from environment variables or use 8080 as a default
const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectDB.then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port: ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to DB', err);
  process.exit(1); 
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});