const ProjectCategory = require("../../models/ProjectCategory");

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
