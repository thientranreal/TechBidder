const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
  type: { type: String, required: true },
  link: { type: String, required: true },
  teamMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TeamMember",
  },
});

const SocialMedia = mongoose.model("SocialMedia", socialMediaSchema);

module.exports = SocialMedia;
