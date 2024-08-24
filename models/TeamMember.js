const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profession: { type: String, required: true },
  image: { type: String, required: true },
  fbLink: { type: String },
  twitterLink: { type: String },
  instaLink: { type: String },
  linkedInLink: { type: String },
});

const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

module.exports = TeamMember;
