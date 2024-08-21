exports.getProjectPage = (req, res) => {
  res.render("project", { currentPath: req.path });
};
