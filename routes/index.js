const express = require("express");
const router = express.Router();

const homeController = require("../controllers/homeController");
const aboutController = require("../controllers/aboutController");
const contactController = require("../controllers/contactController");
const projectController = require("../controllers/projectController");
const serviceController = require("../controllers/serviceController");
const teamController = require("../controllers/teamController");
const testimonialController = require("../controllers/testimonialController");
const errorController = require("../controllers/errorController");

// Routes
router.get("/", homeController.getHomePage);
router.get("/about", aboutController.getAboutPage);
router.get("/contact", contactController.getContactPage);
router.get("/project", projectController.getProjectPage);
router.get("/service", serviceController.getServicePage);
router.get("/team", teamController.getTeamPage);
router.get("/testimonial", testimonialController.getTestimonialPage);

// Error route (404)
router.use(errorController.get404Page);

module.exports = router;
