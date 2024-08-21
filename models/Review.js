const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  message: { type: String, required: true },
  avatar: { type: String, required: true },
  reviewer: { type: String, required: true },
  profession: { type: String, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
