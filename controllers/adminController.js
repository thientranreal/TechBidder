const ProjectCategory = require("../models/ProjectCategory");
const Project = require("../models/Project");
const fs = require("fs");

// Get projects
exports.getProject = async (req, res) => {
  try {
    const projects = await Project.find().populate("projectCategory");
    const projectCategories = await ProjectCategory.find();
    res.render("admin/project", {
      page: "project",
      layout: "./layouts/admin",
      projects,
      projectCategories,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.render("admin/project", {
      page: "project",
      layout: "./layouts/admin",
      projects: [],
      projectCategories: [],
      error: "Lỗi lấy dữ liệu",
    });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  const { name, projectCategory } = req.body;

  const image = req.file ? `/img/${req.file.filename}` : null; // Handle image upload

  try {
    const newProject = new Project({
      name,
      image,
      projectCategory,
    });

    await newProject.save();
    res.redirect("/admin/project");
  } catch (error) {
    console.error("Error creating project:", error);

    const projects = await Project.find().populate("projectCategory");
    const projectCategories = await ProjectCategory.find();

    res.render("admin/project", {
      page: "project",
      layout: "./layouts/admin",
      projects,
      projectCategories,
      error: "Lỗi thêm mới",
    });
  }
};

// Edit a project
exports.editProject = async (req, res) => {
  const { id } = req.params;
  const { name, projectCategory } = req.body;
  const image = req.file ? `/img/${req.file.filename}` : null; // Handle image upload

  try {
    await Project.findByIdAndUpdate(id, {
      name,
      image,
      projectCategory,
    });
    res.redirect("/admin/project");
  } catch (error) {
    console.error("Error editing project:", error);

    const projects = await Project.find().populate("projectCategory");
    const projectCategories = await ProjectCategory.find();

    res.render("admin/project", {
      page: "project",
      layout: "./layouts/admin",
      projects,
      projectCategories,
      error: "Lỗi sửa",
    });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the project to get the image path
    const project = await Project.findById(id);

    if (project) {
      // Delete the image file from the server
      const imagePath = `${__dirname}/../public${project.image}`;

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });

      // Delete the project
      await Project.findByIdAndDelete(id);
    }

    res.redirect("/admin/project");
  } catch (error) {
    console.error("Error deleting project:", error);

    const projects = await Project.find().populate("projectCategory");
    const projectCategories = await ProjectCategory.find();

    res.render("admin/project", {
      page: "project",
      layout: "./layouts/admin",
      projects,
      projectCategories,
      error: "Lỗi xóa",
    });
  }
};

// Get Project type
exports.getProjectType = async (req, res) => {
  try {
    const projectTypes = await ProjectCategory.find(); // Get all project types
    res.render("admin/project-type", {
      page: "projectType",
      layout: "./layouts/admin",
      projectTypes,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching project types:", error);

    res.render("admin/project-type", {
      page: "projectType",
      layout: "./layouts/admin",
      projectTypes: [],
      error: "Lỗi lấy dữ liệu",
    });
  }
};

// Create Project Type
exports.createProjectType = async (req, res) => {
  const { name } = req.body;

  try {
    const newProjectCategory = new ProjectCategory({ name });

    await newProjectCategory.save(); // Save to MongoDB

    res.redirect("/admin/project-type");
  } catch (error) {
    console.error("Error creating project category:", error);

    const projectTypes = await ProjectCategory.find();

    res.render("admin/project-type", {
      page: "projectType",
      layout: "./layouts/admin",
      projectTypes,
      error: "Lỗi thêm mới",
    });
  }
};

// Edit Project Type
exports.editProjectType = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    await ProjectCategory.findByIdAndUpdate(id, { name });
    res.redirect("/admin/project-type");
  } catch (error) {
    console.error("Error editing project category:", error);

    const projectTypes = await ProjectCategory.find();

    res.render("admin/project-type", {
      page: "projectType",
      layout: "./layouts/admin",
      projectTypes,
      error: "Lỗi chỉnh sửa",
    });
  }
};

// Delete Project Type
exports.deleteProjectType = async (req, res) => {
  const { id } = req.params;

  try {
    await ProjectCategory.findByIdAndDelete(id);
    res.redirect("/admin/project-type");
  } catch (error) {
    console.error("Error deleting project category:", error);

    const projectTypes = await ProjectCategory.find();

    res.render("admin/project-type", {
      page: "projectType",
      layout: "./layouts/admin",
      projectTypes,
      error: "Lỗi xóa",
    });
  }
};

exports.getSolution = (req, res) => {
  res.render("admin/solution", {
    page: "solution",
    layout: "./layouts/admin",
  });
};

exports.getTeamMember = (req, res) => {
  res.render("admin/team-member", {
    page: "teamMember",
    layout: "./layouts/admin",
  });
};

exports.getReview = (req, res) => {
  res.render("admin/review", {
    page: "review",
    layout: "./layouts/admin",
  });
};
