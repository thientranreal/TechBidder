const ProjectCategory = require("../models/ProjectCategory");
const Project = require("../models/Project");
const Solution = require("../models/Solution");
const Review = require("../models/Review");
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
        const oldImgPath = `${__dirname}/../public${project.image}`;

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
      const oldImgPath = `${__dirname}/../public${project.image}`;

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

// Get solution
exports.getSolution = async (req, res) => {
  try {
    const solutions = await Solution.find();

    res.render("admin/solution", {
      page: "solution",
      layout: "./layouts/admin",
      solutions,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching solutions:", error);

    res.render("admin/solution", {
      page: "solution",
      layout: "./layouts/admin",
      solutions: [],
      error: "Lỗi tải giải pháp",
    });
  }
};

// Create new solution
exports.createSolution = async (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? `/img/${req.file.filename}` : null;

  try {
    const newSolution = new Solution({ name, description, image });

    await newSolution.save();
    res.redirect("/admin/solution");
  } catch (error) {
    console.error("Error creating solution:", error);

    const solutions = await Solution.find();

    res.render("admin/solution", {
      page: "solution",
      layout: "./layouts/admin",
      solutions,
      error: "Lỗi tạo giải pháp",
    });
  }
};

// Edit existing solution
exports.editSolution = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const image = req.file ? `/img/${req.file.filename}` : null;

  try {
    const solution = await Solution.findById(id);

    if (solution) {
      if (image && solution.image) {
        // Delete the image file from the server
        const oldImgPath = `${__dirname}/../public${solution.image}`;

        fs.unlink(oldImgPath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });

        solution.image = image;
      }

      solution.name = name;
      solution.description = description;
      await solution.save();
    }
    res.redirect("/admin/solution");
  } catch (error) {
    console.error("Error editing solution:", error);

    const solutions = await Solution.find();

    res.render("admin/solution", {
      page: "solution",
      layout: "./layouts/admin",
      solutions,
      error: "Lỗi sửa giải pháp",
    });
  }
};

// Delete solution
exports.deleteSolution = async (req, res) => {
  const { id } = req.params;
  try {
    const solution = await Solution.findByIdAndDelete(id);

    if (solution) {
      if (solution.image) {
        // Delete the image file from the server
        const oldImgPath = `${__dirname}/../public${solution.image}`;

        fs.unlink(oldImgPath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      }
    }

    res.redirect("/admin/solution");
  } catch (error) {
    console.error("Error deleting solution:", error);

    const solutions = await Solution.find();

    res.render("admin/solution", {
      page: "solution",
      layout: "./layouts/admin",
      solutions,
      error: "Lỗi xóa giải pháp",
    });
  }
};

exports.getTeamMember = (req, res) => {
  res.render("admin/team-member", {
    page: "teamMember",
    layout: "./layouts/admin",
  });
};

// Get review
exports.getReview = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.render("admin/review", {
      page: "review",
      layout: "./layouts/admin",
      reviews,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);

    res.render("admin/review", {
      page: "review",
      layout: "./layouts/admin",
      reviews: [],
      error: "Lỗi tải đánh giá",
    });
  }
};

// Create new review
exports.createReview = async (req, res) => {
  const { message, reviewer, profession } = req.body;
  const avatar = req.file ? `/img/${req.file.filename}` : null;

  try {
    const newReview = new Review({ message, avatar, reviewer, profession });

    await newReview.save();
    res.redirect("/admin/review");
  } catch (error) {
    console.error("Error creating review:", error);

    const reviews = await Review.find();

    res.render("admin/review", {
      page: "review",
      layout: "./layouts/admin",
      reviews,
      error: "Lỗi tạo đánh giá",
    });
  }
};

// Edit existing review
exports.editReview = async (req, res) => {
  const { id } = req.params;
  const { message, reviewer, profession } = req.body;
  const avatar = req.file ? `/img/${req.file.filename}` : null;

  try {
    const review = await Review.findById(id);

    if (review) {
      if (avatar && review.avatar) {
        // Delete the image file from the server
        const oldImgPath = `${__dirname}/../public${review.avatar}`;

        fs.unlink(oldImgPath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });

        review.avatar = avatar;
      }

      review.message = message;
      review.reviewer = reviewer;
      review.profession = profession;
      await review.save();
    }
    res.redirect("/admin/review");
  } catch (error) {
    console.error("Error editing review:", error);

    const reviews = await Review.find();

    res.render("admin/review", {
      page: "review",
      layout: "./layouts/admin",
      reviews,
      error: "Lỗi sửa đánh giá",
    });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);

    if (review) {
      if (review.avatar) {
        // Delete the image file from the server
        const oldImgPath = `${__dirname}/../public${review.avatar}`;

        fs.unlink(oldImgPath, (err) => {
          if (err) {
            console.error("Error deleting image file:", err);
          }
        });
      }
    }

    res.redirect("/admin/review");
  } catch (error) {
    console.error("Error deleting review:", error);

    const reviews = await Review.find();

    res.render("admin/review", {
      page: "review",
      layout: "./layouts/admin",
      reviews,
      error: "Lỗi xóa đánh giá",
    });
  }
};
