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
} from "../controllers/dashboard.js";

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
router.post("/hero-content", isAuthenticated, heroContent);

export default router;
