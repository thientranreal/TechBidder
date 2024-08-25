const Project = require("../models/Project");
const ProjectCategory = require("../models/ProjectCategory");

exports.getProjectPage = async (req, res) => {
  try {
    const projects = await Project.find().populate("projectCategory");
    const projectTypes = await ProjectCategory.find();

    res.render("project", { page: "project", projects, projectTypes });
  } catch (error) {
    console.error("Error fetching project", error);

    res.render("project", { page: "project", projects: [], projectTypes: [] });
  }
};
