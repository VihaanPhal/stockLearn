// server.js

const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const app = express();

// Middleware example
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define the port
const port = 3000;

// Hard-coded MongoDB URI
const mongoURI = "mongodb://localhost:27017/mydatabase";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/api/user", userRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
