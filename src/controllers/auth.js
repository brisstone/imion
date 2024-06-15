import User from "../models/User.model.js";
import bcrypt from "bcryptjs";

export const loginView = async (req, res) => {
  try {
    res.render("../src/views/pages/login.ejs", {
      pageTitle: "Login",
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/login");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      req.session.user = user;
      res.redirect("/dashboard");
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/login");
  }
};
export const registerView = async (req, res) => {
  try {
    res.render("../src/views/pages/register.ejs", {
      pageTitle: "Register",
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};
export const register = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json("Username already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ email, name, password: hashedPassword });
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.redirect("/register");
  }
};
export const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/", 301);
};
