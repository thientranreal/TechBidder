const Review = require("../models/Review");

exports.getTestimonialPage = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.render("testimonial", { page: "testimonial", reviews });
  } catch (error) {
    console.error("Error fetching testimonial", error);
    res.render("testimonial", { page: "testimonial", reviews: [] });
  }
};
