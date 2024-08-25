const TeamMember = require("../models/TeamMember");

exports.getAboutPage = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();

    res.render("about", { page: "about", teamMembers });
  } catch (error) {
    console.error("Error fetching team member", error);
    res.render("about", { page: "about", teamMembers: [] });
  }
};
