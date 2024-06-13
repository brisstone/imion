import HeroContent from "../models/HeroContent.model.js";

import { servicesData } from "../services/getHomeData.js";
import ServiceContent from "../models/ServiceContent.model.js";

import path from "path";
import fs from "fs";

export const dashboard = async (req, res) => {
  const user = req.session.user;
  try {
    const data = await getDashboardData(user);
    res.render("../src/views/pages/dashboard.ejs", {
      pageTitle: "Dashboard",
      ...data,
    });
  } catch (error) {
    res.satus(500).send({ message: error.message || "Error Occured" });
  }
};

export const heroContent = async (req, res) => {
  const user = req.session.user;
  try {
    const { title_one, title_two, content, _id } = req.body;

    if (_id !== "") {
      const update = await HeroContent.findByIdAndUpdate(
        _id,
        { title_one, title_two, content },
        { new: true }
      );
    } else {
      console.log("got else ");
      const hero = new HeroContent({ title_one, title_two, content });
      await hero.save();
    }
    const data = await getDashboardData(user);
    return res.render("../src/views/pages/dashboard.ejs", {
      pageTitle: "Dashboard",
      ...data,
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

export const createService = async (req, res) => {
  const user = req.session.user;
  const { title, description, _id } = req.body;
  let icon;

  if (!title || !description) {
    return res.status(400).send("Title and description are required.");
  }

  try {
    if (req.files && req.files.icon) {
      const upload = req.files.icon;
      icon = `uploads/${Date.now()}_${upload.name}`;

      upload.mv(`public/${icon}`, async (err) => {
        if (err) {
          return res.status(500).send("File upload failed.");
        }
      });
    }

    if (_id) {
      await ServiceContent.findByIdAndUpdate(
        _id,
        { icon, title, description },
        { new: true }
      );
    } else {
      const newService = new ServiceContent({ icon, title, description });
      await newService.save();
    }

    const data = await getDashboardData(user);
    res.render("../src/views/pages/dashboard.ejs", {
      pageTitle: "Dashboard",
      ...data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

export const deleteService = async (req, res) => {
  const { _id } = req.body;
  try {
    const service = await ServiceContent.findById(_id);

    if (!service) {
      return res.status(404).send("Service not found.");
    }
    if (service.icon) {
      fs.unlinkSync(`public/${service.icon}`);
    }
    await ServiceContent.findByIdAndDelete(_id);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

const getDashboardData = async (user) => {
  try {
    const heroContent = await HeroContent.findOne({}).limit(1);
    const services = await ServiceContent.find({});
    const serviceContent = services.length > 0 ? services : servicesData;
    return {
      user,
      heroContent,
      serviceContent,
    };
  } catch (error) {
    console.log(error);
  }
};
