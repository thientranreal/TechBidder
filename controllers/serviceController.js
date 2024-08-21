exports.getServicePage = (req, res) => {
  res.render("service", { currentPath: req.path });
};
