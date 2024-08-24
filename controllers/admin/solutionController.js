const Solution = require("../../models/Solution");
const fs = require("fs");

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
        const oldImgPath = `${__dirname}/../../public${solution.image}`;

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
        const oldImgPath = `${__dirname}/../../public${solution.image}`;

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
