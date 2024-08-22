const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect("/admin");
  }
  res.render("login", { error: null });
};

exports.postLogin = async (req, res) => {
  // Authenticate user
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await Admin.findOne({ username });
    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", {
        error: "Invalid credentials",
        success: null,
      });
    }

    req.session.user = user;
    res.redirect("/admin");
  } catch (error) {
    return res.render("login", { error: "An error occurred" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
