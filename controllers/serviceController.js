const Solution = require("../models/Solution");

exports.getServicePage = async (req, res) => {
  try {
    const solutions = await Solution.find();

    res.render("service", { page: "service", solutions });
  } catch (error) {
    console.error("Error fetching solution", error);
    res.render("service", { page: "service", solutions: [] });
  }
};
