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

// admin controller
const projectAdminController = require("../controllers/admin/projectController");
const projectTypeController = require("../controllers/admin/projectTypeController");
const reviewController = require("../controllers/admin/reviewController");
const solutionController = require("../controllers/admin/solutionController");
const teamMemberController = require("../controllers/admin/teamMemberController");

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
router.get(
  "/admin/project",
  ensureAuthenticated,
  projectAdminController.getProject
);
router.get(
  "/admin/project-type",
  ensureAuthenticated,
  projectTypeController.getProjectType
);
router.get(
  "/admin/solution",
  ensureAuthenticated,
  solutionController.getSolution
);
router.get(
  "/admin/team-member",
  ensureAuthenticated,
  teamMemberController.getTeamMember
);
router.get("/admin/review", ensureAuthenticated, reviewController.getReview);

// Post routes
router.post("/login", authController.postLogin);
// CRUD for project type
router.post(
  "/admin/project-type/create",
  projectTypeController.createProjectType
);
router.post(
  "/admin/project-type/edit/:id",
  projectTypeController.editProjectType
);
router.post(
  "/admin/project-type/delete/:id",
  projectTypeController.deleteProjectType
);
// CRUD for project
router.post(
  "/admin/project/create",
  upload.single("image"),
  projectAdminController.createProject
);
router.post(
  "/admin/project/edit/:id",
  upload.single("image"),
  projectAdminController.editProject
);
router.post("/admin/project/delete/:id", projectAdminController.deleteProject);

// CRUD Solution routes
router.post(
  "/admin/solution/create",
  upload.single("image"),
  solutionController.createSolution
);
router.post(
  "/admin/solution/edit/:id",
  upload.single("image"),
  solutionController.editSolution
);
router.post("/admin/solution/delete/:id", solutionController.deleteSolution);

// CRUD Review routes
router.post(
  "/admin/review/create",
  upload.single("avatar"),
  reviewController.createReview
);
router.post(
  "/admin/review/edit/:id",
  upload.single("avatar"),
  reviewController.editReview
);
router.post("/admin/review/delete/:id", reviewController.deleteReview);

// CRUD team member routs
router.post(
  "/admin/team-member/create",
  upload.single("image"),
  teamMemberController.createTeamMember
);

router.post(
  "/admin/team-member/edit-social-media/:id",
  teamMemberController.updateSocialMedia
);

// Error route (404)
router.use(errorController.get404Page);

module.exports = router;
