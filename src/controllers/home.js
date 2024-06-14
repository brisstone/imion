import { getData } from "../services/getData.js";

export const home = async (req, res) => {
  try {
    const data = await getData();
    console.log(data);
    res.render("../src/views/pages/index.ejs", {
      pageTitle: "Home App",
      ...data,
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

export const about = async (req, res) => {
  try {
    res.render("../src/views/pages/about.ejs", {
      pageTitle: "About Us",
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};
