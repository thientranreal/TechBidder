const Solution = require("../models/Solution");
const Project = require("../models/Project");
const ProjectCategory = require("../models/ProjectCategory");
const Review = require("../models/Review");
const TeamMember = require("../models/TeamMember");

exports.getHomePage = async (req, res) => {
  try {
    const projects = await Project.find().populate("projectCategory");
    const projectTypes = await ProjectCategory.find();
    const solutions = await Solution.find();
    const reviews = await Review.find();
    const teamMembers = await TeamMember.find();

    res.render("index", {
      page: "index",
      solutions,
      projects,
      projectTypes,
      reviews,
      teamMembers,
    });
  } catch (error) {
    console.error("Error fetching", error);
    res.render("index", {
      page: "index",
      solutions: [],
      projects: [],
      projectTypes: [],
      reviews: [],
      teamMembers: [],
    });
  }
};
