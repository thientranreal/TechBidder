const mongoose = require("mongoose");

const projectCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const ProjectCategory = mongoose.model(
  "ProjectCategory",
  projectCategorySchema
);

module.exports = ProjectCategory;
