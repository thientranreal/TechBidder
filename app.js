const express = require("express");
const mongoose = require("mongoose");
const app = express();

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/tech-bidder-db")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", "views");

// Static files (CSS, JS, Images)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes/index"));

// Start verver
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
