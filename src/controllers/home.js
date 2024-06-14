import { getData } from "../services/getData.js";
import { contactForm, contactInfo } from "../data/contactForm.js";

export const home = async (req, res) => {
  try {
    const data = await getData();
    // console.log(data.heroContent);
    res.render("../src/views/pages/index.ejs", {
      pageTitle: "Home App",
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
    res.render("../src/views/pages/about.ejs", {
      pageTitle: "About Us",
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
