const Review = require("../../models/Review");
const fs = require("fs");

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
        const oldImgPath = `${__dirname}/../../public${review.avatar}`;

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
        const oldImgPath = `${__dirname}/../../public${review.avatar}`;

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
