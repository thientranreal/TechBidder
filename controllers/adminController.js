exports.getProject = (req, res) => {
  res.render("admin/project", { page: "project", layout: "./layouts/admin" });
};

exports.getProjectType = (req, res) => {
  res.render("admin/project-type", {
    page: "projectType",
    layout: "./layouts/admin",
  });
};

exports.getSolution = (req, res) => {
  res.render("admin/solution", {
    page: "solution",
    layout: "./layouts/admin",
  });
};

exports.getTeamMember = (req, res) => {
  res.render("admin/team-member", {
    page: "teamMember",
    layout: "./layouts/admin",
  });
};

exports.getReview = (req, res) => {
  res.render("admin/review", {
    page: "review",
    layout: "./layouts/admin",
  });
};
