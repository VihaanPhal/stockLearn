// server.js
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./Routes/user");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use(cors({ origin: "*" }));

// Hard-coded MongoDB URI
const mongoURI =
  "mongodb+srv://phalvihaan:gQ5ZQvPzncg7XnAT@cluster0.1fiaz4d.mongodb.net/";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after connecting to MongoDB
    app.listen(3000, () => {
      console.log(`Server is running on port 3000`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Use the user routes
app.use("/api/user", userRoute);
