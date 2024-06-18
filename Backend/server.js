const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Example middleware to log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Define the port
const port = 3000;

// Hard-coded MongoDB URI
const mongoURI =
  "mongodb+srv://phalvihaan:gQ5ZQvPzncg7XnAT@cluster0.1fiaz4d.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after connecting to MongoDB
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use the user routes
app.use("/api/user", userRoute);
