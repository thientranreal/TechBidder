const TeamMember = require("../../models/TeamMember");
const fs = require("fs");

// Get team member
exports.getTeamMember = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();

    res.render("admin/team-member", {
      page: "teamMember",
      layout: "./layouts/admin",
      teamMembers,
      error: null,
    });
  } catch (error) {
    console.error("Error fetching team member:", error);

    res.render("admin/team-member", {
      page: "teamMember",
      layout: "./layouts/admin",
      teamMembers: [],
      error: "Lỗi tải thành viên",
    });
  }
};

// Create new team member
exports.createTeamMember = async (req, res) => {
  const { name, profession } = req.body;
  const image = req.file ? `/img/${req.file.filename}` : null;

  try {
    await TeamMember.create({ name, profession, image });

    res.redirect("/admin/team-member");
  } catch (error) {
    console.error("Error creating team member:", error);

    const teamMembers = await TeamMember.find();

    res.render("admin/team-member", {
      page: "teamMember",
      layout: "./layouts/admin",
      teamMembers,
      error: "Lỗi thêm thành viên",
    });
  }
};

// Edit team member
exports.editTeamMember = async (req, res) => {
  const { id } = req.params;
  const { name, profession } = req.body;
  try {
    await TeamMember.findByIdAndUpdate(id, { name, profession });
    res.redirect("/admin/team-member");
  } catch (error) {
    res.render("admin/teamMember", {
      error: "Lỗi khi sửa thành viên.",
    });
  }
};

// Delete team member
exports.deleteTeamMember = async (req, res) => {
  const { id } = req.params;
  try {
    await TeamMember.findByIdAndDelete(id);
    res.redirect("/admin/team-member");
  } catch (error) {
    res.render("admin/teamMember", {
      error: "Lỗi khi xóa thành viên.",
    });
  }
};

// Update social media links for a specific team member
exports.updateSocialMedia = async (req, res) => {
  const { id } = req.params; // teamMember ID from the URL params
  const { facebook, twitter, instagram, linkedin } = req.body; // Social media links from the form

  try {
    const teamMember = await TeamMember.findById(id);

    if (teamMember) {
      teamMember.fbLink = facebook;
      teamMember.twitterLink = twitter;
      teamMember.instaLink = instagram;
      teamMember.linkedInLink = linkedin;

      teamMember.save();
    }

    // Redirect or respond with success message
    res.redirect("/admin/team-member"); // Redirect to the updated team member's page
  } catch (error) {
    console.error("Error updating social media:", error);

    const teamMembers = await TeamMember.find();

    res.render("admin/team-member", {
      page: "teamMember",
      layout: "./layouts/admin",
      teamMembers,
      error: "Lỗi cập nhật mạng xã hội",
    });
  }
};
