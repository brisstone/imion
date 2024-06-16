import ContactInfoContent from "../models/ContactInfoContent.model.js";
import SocialMediaContent from "../models/SocialMediaContent.model.js";
import { getData } from "../services/getData.js";

export const renderDashboard = async (res, user) => {
  try {
    const data = await getData();
    return res.render("../src/views/pages/dashboard-contact.ejs", {
      pageTitle: "Dashboard Contact",
      ...data,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const dashboardContact = async (req, res) => {
  const user = req.session.user;
  try {
    await renderDashboard(res, user);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

export const createContactInfo = async (req, res) => {
  const user = req.session.user;
  const { phone, email, url, address, _id } = req.body;
  if (!phone || !email || !address || !url) {
    return res.status(400).send("All fields are required.");
  }
  try {
    if (_id) {
      await ContactInfoContent.findByIdAndUpdate(
        _id,
        { phone, email, url, address },
        { new: true }
      );
    } else {
      const newInfo = new ContactInfoContent({
        phone,
        email,
        url,
        address,
      });
      await newInfo.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
export const createSocialMediaLinks = async (req, res) => {
  const user = req.session.user;
  const { name, url, _id } = req.body;
  if (!name || !url) {
    return res.status(400).send("All fields are required.");
  }
  try {
    if (_id) {
      await SocialMediaContent.findByIdAndUpdate(
        _id,
        { name: name.toLowerCase(), url: url.toLowerCase() },
        { new: true }
      );
    } else {
      const newInfo = new SocialMediaContent({
        name: name.toLowerCase(),
        url: url.toLowerCase(),
      });
      await newInfo.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    ContactInfoContent;
    console.error(error);
    res.status(500).send(error);
  }
};

export const deleteSocialMediaLinks = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;

  try {
    const social = await SocialMediaContent.findById(_id);

    if (!social) {
      return res.status(404).send("item not found.");
    }

    await SocialMediaContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};
