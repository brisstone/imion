import { getData } from "../services/getData.js";
import { contactForm, contactInfo } from "../data/contactForm.js";

export const home = async (req, res) => {
  try {
    const data = await getData();
    console.log(data, "data");
    res.render("pages/index.ejs", {
      pageTitle: "Home",
      ...data,
      contactForm,
      contactInfo,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

export const aboutLogo = async (req, res) => {
  try {
    const data = await getData();
    res.render("pages/about-logo", {
      pageTitle: "About IMION Logo",
      ...data,
      contactForm,
      contactInfo,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

export const about = async (req, res) => {
  try {
    const {
      aboutTopContent,
      InfoContent,
      logoContent,
      departmentContent,
      socialContent,
    } = await getData();
    res.render("pages/about.ejs", {
      pageTitle: "About Us",
      aboutTopContent,
      InfoContent,
      logoContent,
      departmentContent,
      socialContent,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

export const gallery = async (req, res) => {
  try {
    const { galleryContent, InfoContent, logoContent, socialContent } =
      await getData();
    res.render("pages/gallery.ejs", {
      pageTitle: "Gallery",
      galleryContent,
      InfoContent,
      logoContent,
      socialContent,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

export const contact = async (req, res) => {
  try {
    const data = await getData();
    res.render("pages/contact.ejs", {
      pageTitle: "Contact",
      ...data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

export const event = async (req, res) => {
  try {
    const data = await getData();
    res.render("pages/events.ejs", {
      pageTitle: "Event",
      ...data,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
