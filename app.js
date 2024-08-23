require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
const bcrypt = require("bcrypt");
const app = express();

// Set up session management
const session = require("express-session");
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use secure: true in production for HTTPS
  })
);

// Create a default admin account
async function createDefaultAdmin() {
  try {
    // Check if any admin already exists
    const existingAdmin = await Admin.findOne({ username: "admin" });

    if (!existingAdmin) {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash("12345", saltRounds);

      // Create a default admin account if it doesn't exist
      const defaultAdmin = new Admin({
        username: "admin",
        password: hashedPassword,
      });

      await defaultAdmin.save();
      console.log("Default admin account created successfully.");
    } else {
      console.log("Admin account already exists.");
    }
  } catch (error) {
    console.error("Error creating default admin account:", error);
  }
}

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/tech-bidder-db")
  .then(() => {
    console.log("Connected to MongoDB");

    // Create a default admin account
    createDefaultAdmin();
  })
  .catch((err) => console.log(err));

// Set view engine to EJS
app.use(expressLayouts);
app.set("layout", "./layouts/user");
app.set("view engine", "ejs");

// Static files (CSS, JS, Images)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", require("./routes"));

// Start verver
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
