import express from "express";
const router = express.Router();
import { home, about } from "../controllers/home.js";
import {
  loginView,
  login,
  register,
  registerView,
  logout,
} from "../controllers/auth.js";
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
} from "../controllers/dashboard.js";
import { contactUs } from "../controllers/contact.js";

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

router.get("/", home);
router.get("/about", about);
router.get("/login", loginView);
router.post("/login", login);
router.get("/logout", logout);
router.get("/register", registerView);
router.post("/register", register);
router.get("/dashboard", isAuthenticated, dashboard);
router.post("/create-service", isAuthenticated, createService);
router.post("/delete-service", isAuthenticated, deleteService);
router.post("/hero-content", isAuthenticated, heroContent);

router.post("/create-objective", isAuthenticated, createObject);
router.post("/delete-objective", isAuthenticated, deleteObject);

router.post("/create-trustee", isAuthenticated, createTrustee);
router.post("/delete-trustee", isAuthenticated, deleteTrustee);

router.post("/create-governing", isAuthenticated, createGoverning);
router.post("/delete-governing", isAuthenticated, deleteGoverning);

router.post("/contact-form", contactUs);
export default router;
