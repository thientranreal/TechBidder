const Project = require("../../models/Project");
const ProjectCategory = require("../../models/ProjectCategory");
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
    // Find the project to get the image path
    const project = await Project.findById(id);

    if (project) {
      if (image && project.image) {
        // Delete the image file from the server
        const oldImgPath = `${__dirname}/../../public${project.image}`;

        fs.unlink(oldImgPath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });

        project.image = image;
      }

      project.name = name;
      project.projectCategory = projectCategory;
      await project.save();
    }

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
    const project = await Project.findByIdAndDelete(id);

    if (project && project.image) {
      // Delete the image file from the server
      const oldImgPath = `${__dirname}/../../public${project.image}`;

      fs.unlink(oldImgPath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        }
      });
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
