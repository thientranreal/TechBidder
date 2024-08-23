const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect("/admin/project");
  }
  res.render("login", { error: null, layout: false });
};

exports.postLogin = async (req, res) => {
  // Authenticate user
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.render("login", { error: "User not found", layout: false });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Invalid credentials",
        success: null,
        layout: false,
      });
    }

    req.session.user = user;
    res.redirect("/admin/project");
  } catch (error) {
    return res.render("login", { error: "An error occurred", layout: false });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
