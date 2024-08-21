exports.getTestimonialPage = (req, res) => {
  res.render("testimonial", { currentPath: req.path });
};
