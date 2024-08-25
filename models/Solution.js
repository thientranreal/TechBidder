const mongoose = require("mongoose");

const solutionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String, required: true },
});

const Solution = mongoose.model("Solution", solutionSchema);

module.exports = Solution;
