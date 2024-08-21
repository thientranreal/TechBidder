exports.getTeamPage = (req, res) => {
  res.render("team", { currentPath: req.path });
};
