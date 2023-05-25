const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// Routes

const userRoutes = require("./routes/user");
app.use("/", userRoutes);
// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
  });

// Port
const port = process.env.PORT || 4000;

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
