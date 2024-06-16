import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import { getData } from "../services/getData.js";

export const loginView = async (req, res) => {
  try {
    const { socialContent } = await getData();
    res.render("../src/views/pages/login.ejs", {
      pageTitle: "Login",
      socialContent,
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

export const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/", 301);
};

export const register = async (req, res) => {
  try {
    await User.deleteMany({});
    const users = [
      {
        email: "imion@gmail.com",
        name: "IMION ADMIN",
        password: "password",
      },
      {
        email: "user2@example.com",
        name: "User 2",
        password: "password2",
      },
    ];

    const salt = await bcrypt.genSalt(10);
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      const newUser = new User({
        email: user.email,
        name: user.name,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`Created user: ${user.email}`);
    }

    console.log("User seeding completed.");
    res.redirect("/login");
  } catch (err) {
    res.redirect("/");
    console.error("Error seeding users", err);
  }
};
