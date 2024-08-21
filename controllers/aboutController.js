exports.getAboutPage = (req, res) => {
  res.render("about", { currentPath: req.path });
};
