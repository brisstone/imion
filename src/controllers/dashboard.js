import AboutContent from "../models/AboutContent.model.js";
import DepartmentContent from "../models/DepartmentContent.model.js";
import FactContent from "../models/FactContent.model.js";
import GoverningContent from "../models/GoverningContent.mode.js";
import HeroContent from "../models/HeroContent.model.js";
import HomeVideo from "../models/HomeVideo.model.js";
import Logo from "../models/LogoContent.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";

import ServiceContent from "../models/ServiceContent.model.js";
import TrusteeContent from "../models/TrusteeContent.model.js";
import UpcomingEventContent from "../models/UpcomingEventContent.model.js";
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
  let _id = req.body._id || ""; // Assuming _id is coming from the request body
  let video;

  try {
    // Remove previous video if _id is provided
    if (_id !== "") {
      const previousVideo = await HomeVideo.findById(_id);
      if (previousVideo && previousVideo.url) {
        fs.unlinkSync(`public/${previousVideo.url}`);
      }
    }

    // Upload new video
    if (req.files && req.files.video) {
      const upload = req.files.video;
      video = `uploads/${Date.now()}_${upload.name}`;
      await new Promise((resolve, reject) => {
        upload.mv(`public/${video}`, (err) => {
          if (err) {
            reject(new Error("File upload failed."));
          } else {
            resolve();
          }
        });
      });
    } else {
      // If no video is provided, set video to an empty string or a default value
      video = "/assets//videos/videpo_22.mp4";
    }

    // Update or create a new document
    if (_id !== "") {
      await HomeVideo.findByIdAndUpdate(_id, { url: video }, { new: true });
    } else {
      const newView = new HomeVideo({ url: video });
      await newView.save();
    }

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const uploadLogo = async (req, res) => {
  const user = req.session.user;
  let _id = req.body._id || "";
  let logo;
  try {
    if (_id !== "") {
      const previousLogo = await Logo.findById(_id);
      if (previousLogo && previousLogo.url) {
        fs.unlinkSync(`public/${previousLogo.url}`);
      }
    }

    if (req.files && req.files.logo) {
      const upload = req.files.logo;
      logo = `uploads/logo/${Date.now()}_${upload.name}`;
      await new Promise((resolve, reject) => {
        upload.mv(`public/${logo}`, (err) => {
          if (err) {
            reject(new Error("File upload failed."));
          } else {
            resolve();
          }
        });
      });
    } else {
      logo = "assets/images/logoNew.png";
    }
    if (_id !== "") {
      await Logo.findByIdAndUpdate(_id, { url: logo }, { new: true });
    } else {
      const newView = new Logo({ url: logo });
      await newView.save();
    }

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
  const { title, description, month, day, _id } = req.body;
  let url;

  if (!title || !description || !month || !day) {
    return res
      .status(400)
      .send("Title, description, imageUrl, month, and day are required.");
  }

  try {
    if (req.files && req.files.imageUrl) {
      const upload = req.files.imageUrl;
      url = `uploads/events/${Date.now()}_${upload.name}`;
      upload.mv(`public/${url}`, async (err) => {
        if (err) {
          return res.status(500).send("File upload failed.");
        }
      });
    }
    if (_id) {
      await UpcomingEventContent.findByIdAndUpdate(
        _id,
        { title, description, month, day },
        { new: true }
      );
    } else {
      const newEvent = new UpcomingEventContent({
        title,
        description,
        imageUrl: url,
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
    const event = await UpcomingEventContent.findById(_id);

    if (!event) {
      return res.status(404).send("Event not found.");
    }

    await fs.unlinkSync(`public/${event.imageUrl}`);
    await UpcomingEventContent.findByIdAndDelete(_id);
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
  const { title, summary, list, _id } = req.body;

  if (!title || !summary || !list) {
    return res.status(400).send("All fields are required.");
  }

  try {
    const listArray = list.split(",").map((item) => item.trim());

    if (_id !== "") {
      await DepartmentContent.findByIdAndUpdate(
        _id,
        { title, summary, list: listArray, listString: list },
        { new: true }
      );
    } else {
      const created = new DepartmentContent({
        title,
        summary,
        list: listArray,
        listString: list,
      });
      await created.save();
    }

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const createFact = async (req, res) => {
  try {
    const user = req.session.user;
    const { _id, board, mandate, departments, directorate } = req.body;
    if (!board || !mandate || !departments || !directorate) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    if (_id !== "") {
      await FactContent.findByIdAndUpdate(
        _id,
        {
          board: Number(board),
          mandate: Number(mandate),
          departments: Number(departments),
          directorate: Number(directorate),
        },
        { new: true }
      );
    } else {
      const newFact = new FactContent({
        board: Number(board),
        mandate: Number(mandate),
        departments: Number(departments),
        directorate: Number(directorate),
      });

      await newFact.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    res.status(500).send("Internal server error.");
  }
};
