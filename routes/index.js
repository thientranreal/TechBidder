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
// Middleware
const ensureAuthenticated = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

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

// Admin routes
router.get("/admin/project", ensureAuthenticated, adminController.getProject);
router.get(
  "/admin/project-type",
  ensureAuthenticated,
  adminController.getProjectType
);
router.get("/admin/solution", ensureAuthenticated, adminController.getSolution);
router.get(
  "/admin/team-member",
  ensureAuthenticated,
  adminController.getTeamMember
);
router.get("/admin/review", ensureAuthenticated, adminController.getReview);

// Post routes
router.post("/login", authController.postLogin);
// CRUD for project type
router.post("/admin/project-type/create", adminController.createProjectType);
router.post("/admin/project-type/edit/:id", adminController.editProjectType);
router.post(
  "/admin/project-type/delete/:id",
  adminController.deleteProjectType
);
// CRUD for project
router.post(
  "/admin/project/create",
  upload.single("image"),
  adminController.createProject
);
router.post(
  "/admin/project/edit/:id",
  upload.single("image"),
  adminController.editProject
);
router.post("/admin/project/delete/:id", adminController.deleteProject);

// Error route (404)
router.use(errorController.get404Page);

module.exports = router;
