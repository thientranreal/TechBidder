exports.getHomePage = (req, res) => {
  res.render("index", { currentPath: req.path });
};
