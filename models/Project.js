const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  projectCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectCategory",
    required: true,
  },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
