import express from "express";
const router = express.Router();
import { home, about, gallery, contact } from "../controllers/home.js";
import { loginView, login, register, logout } from "../controllers/auth.js";
import {
  dashboard,
  heroContent,
  createService,
  deleteService,
  createObject,
  deleteObject,
  createTrustee,
  deleteTrustee,
  createGoverning,
  deleteGoverning,
  createAbout,
  uploadHomeVideo,
  uploadLogo,
  createEvent,
  deleteEvent,
  createFact,
  createDepartment,
} from "../controllers/dashboard.js";
import { contactUs } from "../controllers/contact.js";
import { dashboardAbout } from "../controllers/dashboardAbout.js";
import {
  dashboardContact,
  createContactInfo,
  createSocialMediaLinks,
  deleteSocialMediaLinks,
} from "../controllers/dashboardContact.js";
import {
  dashboardGallery,
  gallerySeeder,
  deleteGalleryImage,
  addGalleryImage,
} from "../controllers/downloadGal.js";
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    createContactInfo;
    res.redirect("/login");
  }
};

router.get("/", home);
router.get("/about", about);
router.get("/gallery", gallery);
router.get("/contact", contact);
router.get("/login", loginView);
router.post("/login", login);
router.get("/logout", logout);
router.get("/register", register);
router.get("/dashboard", isAuthenticated, dashboard);
router.get("/dashboard-about", isAuthenticated, dashboardAbout);
router.get("/dashboard-contact", isAuthenticated, dashboardContact);
router.post("/create-service", isAuthenticated, createService);
router.post("/delete-service", isAuthenticated, deleteService);
router.post("/hero-content", isAuthenticated, heroContent);
router.get("/dashboard-gallery", isAuthenticated, dashboardGallery);
router.post("/delete-gallery-image", isAuthenticated, deleteGalleryImage);
router.post("/add-gallery-image", isAuthenticated, addGalleryImage);

router.post("/create-objective", isAuthenticated, createObject);
router.post("/delete-objective", isAuthenticated, deleteObject);

router.post("/create-trustee", isAuthenticated, createTrustee);
router.post("/delete-trustee", isAuthenticated, deleteTrustee);

router.post("/create-governing", isAuthenticated, createGoverning);
router.post("/delete-governing", isAuthenticated, deleteGoverning);
router.post("/create-event", isAuthenticated, createEvent);
router.post("/delete-event", isAuthenticated, deleteEvent);

router.post("/create-about", isAuthenticated, createAbout);
router.post("/create-fact", isAuthenticated, createFact);
router.post("/create-department", isAuthenticated, createDepartment);

router.post("/create-social", isAuthenticated, createSocialMediaLinks);
router.post("/delete-social", isAuthenticated, deleteSocialMediaLinks);

router.post("/create-contact-info", isAuthenticated, createContactInfo);

router.post("/upload-home-video", isAuthenticated, uploadHomeVideo);
router.post("/upload-logo", isAuthenticated, uploadLogo);

router.post("/contact-form", contactUs);

router.get("/gallery-seeder", gallerySeeder);
export default router;
