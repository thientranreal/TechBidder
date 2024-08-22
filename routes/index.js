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
const authController = require("../controllers/authController");
const adminController = require("../controllers/adminController");
const ensureAuthenticated = require("../middleware/authMiddleware");

// Routes
router.get("/", homeController.getHomePage);
router.get("/about", aboutController.getAboutPage);
router.get("/contact", contactController.getContactPage);
router.get("/project", projectController.getProjectPage);
router.get("/service", serviceController.getServicePage);
router.get("/team", teamController.getTeamPage);
router.get("/testimonial", testimonialController.getTestimonialPage);
router.get("/login", authController.getLogin);
router.get("/logout", authController.logout);
router.get("/admin", ensureAuthenticated, adminController.getAdmin);

router.post("/login", authController.postLogin);

// Error route (404)
router.use(errorController.get404Page);

module.exports = router;
