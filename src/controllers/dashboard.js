import AboutContent from "../models/AboutContent.model.js";
import DepartmentContent from "../models/DepartmentContent.model.js";
import GoverningContent from "../models/GoverningContent.mode.js";
import HeroContent from "../models/HeroContent.model.js";
import HomeVideo from "../models/HomeVideo.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";

import ServiceContent from "../models/ServiceContent.model.js";
import TrusteeContent from "../models/TrusteeContent.model.js";
import { getData } from "../services/getData.js";

import fs from "fs";

export const renderDashboard = async (res, user) => {
  try {
    const data = await getData();
    return res.render("../src/views/pages/dashboard.ejs", {
      pageTitle: "Dashboard",
      ...data,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const dashboard = async (req, res) => {
  const user = req.session.user;
  try {
    await renderDashboard(res, user);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

export const heroContent = async (req, res) => {
  const user = req.session.user;
  try {
    const { title_one, title_two, content, _id } = req.body;

    if (_id !== "") {
      await HeroContent.findByIdAndUpdate(
        _id,
        { title_one, title_two, content },
        { new: true }
      );
    } else {
      const hero = new HeroContent({ title_one, title_two, content });
      await hero.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const uploadHomeVideo = async (req, res) => {
  const user = req.session.user;
  let video;

  try {
    if (_id !== "") {
      const previousVideo = await HomeVideo.findById(_id);
      if (previousVideo.url) {
        fs.unlinkSync(`public/${previousVideo.url}`);
      }
    }
    if (req.files && req.files.video) {
      const upload = req.files.video;
      video = `uploads/${Date.now()}_${upload.name}`;
      upload.mv(`public/${video}`, async (err) => {
        if (err) {
          return res.status(500).send("File upload failed.");
        }
      });
    }
    if (_id !== "") {
      await HomeVideo.findByIdAndUpdate(_id, { url: video }, { new: true });
    } else {
      const newView = new HomeVideo({ url: video });
      await newView.save();
    }

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
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
        console.log(req.body);
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

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const deleteService = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;
  try {
    const service = await ServiceContent.findById(_id);

    if (!service) {
      return res.status(404).send("Service not found.");
    }
    if (service.icon) {
      fs.unlinkSync(`public/${service.icon}`);
    }
    await ServiceContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
    // return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

export const createObject = async (req, res) => {
  const user = req.session.user;
  try {
    const { title, description, buttonLabel, buttonLink, _id } = req.body;

    const buttonColor = req.body.buttonColor === "on" ? true : false;

    if (_id !== "" && _id !== undefined) {
      console.log("update");
      await ObjectiveContent.findByIdAndUpdate(
        _id,
        { title, description, buttonLabel, buttonLink, buttonColor },
        { new: true }
      );
    } else {
      console.log("create");
      const object = new ObjectiveContent({
        title,
        description,
        buttonLabel,
        buttonLink,
        buttonColor,
      });
      console.log(object);
      await object.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error.");
  }
};

export const deleteObject = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;
  try {
    const objective = await ObjectiveContent.findById(_id);

    if (!objective) {
      return res.status(404).send("Service not found.");
    }
    if (objective.icon) {
      fs.unlinkSync(`public/${service.icon}`);
    }
    await ObjectiveContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
    // return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

export const createTrustee = async (req, res) => {
  const user = req.session.user;
  const { info, name, _id } = req.body;
  let imageUrl;

  if (!info || !name) {
    return res.status(400).send("name and info are required.");
  }

  try {
    if (req.files && req.files.imageUrl) {
      const upload = req.files.imageUrl;
      imageUrl = `uploads/${Date.now()}_${upload.name}`;
      upload.mv(`public/${imageUrl}`, async (err) => {
        if (err) {
          return res.status(500).send("File upload failed.");
        }
      });
    }

    if (_id) {
      await TrusteeContent.findByIdAndUpdate(
        _id,
        { info, name, imageUrl },
        { new: true }
      );
    } else {
      const newTrustee = new TrusteeContent({ info, name, imageUrl });
      await newTrustee.save();
    }

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
export const deleteTrustee = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;
  try {
    const trustee = await TrusteeContent.findById(_id);

    if (!trustee) {
      return res.status(404).send("Trustee not found.");
    }
    if (trustee.imageUrl) {
      fs.unlinkSync(`public/${trustee.imageUrl}`);
    }
    await TrusteeContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

export const createGoverning = async (req, res) => {
  const user = req.session.user;
  const { info, name, _id } = req.body;
  let imageUrl;

  if (!info || !name) {
    return res.status(400).send("name and info are required.");
  }

  try {
    if (req.files && req.files.imageUrl) {
      const upload = req.files.imageUrl;
      imageUrl = `uploads/${Date.now()}_${upload.name}`;
      upload.mv(`public/${imageUrl}`, async (err) => {
        if (err) {
          return res.status(500).send("File upload failed.");
        }
      });
    }

    if (_id) {
      await GoverningContent.findByIdAndUpdate(
        _id,
        { info, name, imageUrl },
        { new: true }
      );
    } else {
      const newGoverning = new GoverningContent({ info, name, imageUrl });
      await newGoverning.save();
    }

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
export const deleteGoverning = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;
  try {
    const governing = await GoverningContent.findById(_id);

    if (!governing) {
      return res.status(404).send("Trustee not found.");
    }
    if (governing.imageUrl) {
      fs.unlinkSync(`public/${governing.imageUrl}`);
    }
    await GoverningContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

export const createEvent = async (req, res) => {
  const user = req.session.user;
  const { title, description, imageUrl, month, day, _id } = req.body;

  if (!title || !description || !imageUrl || !month || !day) {
    return res
      .status(400)
      .send("Title, description, imageUrl, month, and day are required.");
  }

  try {
    if (_id) {
      await UpcomingEvent.findByIdAndUpdate(
        _id,
        { title, description, imageUrl, month, day },
        { new: true }
      );
    } else {
      const newEvent = new UpcomingEvent({
        title,
        description,
        imageUrl,
        month,
        day,
      });
      await newEvent.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const deleteEvent = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;

  try {
    const event = await UpcomingEvent.findById(_id);

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    await UpcomingEvent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};

export const createAbout = async (req, res) => {
  const user = req.session.user;
  const { title, content_one, content_two, content_three, content_four, _id } =
    req.body;

  if (!title || !content_one || !content_two) {
    return res.status(400).send("All fields are required.");
  }
  try {
    if (_id) {
      await AboutContent.findByIdAndUpdate(
        _id,
        { title, content_one, content_two, content_three, content_four },
        { new: true }
      );
    } else {
      const newAbout = new AboutContent({
        title,
        content_one,
        content_two,
        content_three,
        content_four,
      });
      await newAbout.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const deleteAbout = async (req, res) => {
  const { _id } = req.body;
  const user = req.session.user;

  try {
    const about = await AboutContent.findById(_id);

    if (!about) {
      return res.status(404).send("item not found.");
    }

    await AboutContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error.");
  }
};
export const createDepartment = async (req, res) => {
  const user = req.session.user;
  const { title, content_one, content_two } = req.body;

  if (!title || !content_one || !content_two) {
    return res.status(400).send("All fields are required.");
  }
  try {
    if (_id !== "") {
      await DepartmentContent.findByIdAndUpdate(
        _id,
        { title, content_one, content_two, content_three, content_four },
        { new: true }
      );
    } else {
      const created = new DepartmentContent({
        title,
        content_one,
        content_two,
      });
      await created.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};
