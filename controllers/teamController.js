const TeamMember = require("../models/TeamMember");

exports.getTeamPage = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();

    res.render("team", { page: "team", teamMembers });
  } catch (error) {
    console.error("Error fetching team member", error);
    res.render("team", { page: "team", teamMembers: [] });
  }
};
