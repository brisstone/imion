import HeroContent from "../models/HeroContent.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";

import ServiceContent from "../models/ServiceContent.model.js";
import { getData } from "../services/getData.js";

import fs from "fs";

const renderDashboard = async (res, user) => {
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
    const { title, description, buttonLabel, buttonLink, buttonColor, _id } =
      req.body;

    if (_id !== "") {
      await ObjectiveContent.findByIdAndUpdate(
        _id,
        { title, description, buttonLabel, buttonLink, buttonColor },
        { new: true }
      );
    } else {
      const hero = new HeroContent({
        title,
        description,
        buttonLabel,
        buttonLink,
        buttonColor,
      });
      await hero.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
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

// export const dashboard = async (req, res) => {
//   const user = req.session.user;
//   try {
//     const data = await getData();

//     res.render("../src/views/pages/dashboard.ejs", {
//       pageTitle: "Dashboard",
//       ...data,
//       user,
//     });
//   } catch (error) {
//     res.satus(500).send({ message: error.message || "Error Occured" });
//   }
// };

// export const heroContent = async (req, res) => {
//   const user = req.session.user;
//   try {
//     const { title_one, title_two, content, _id } = req.body;

//     if (_id !== "") {
//       const update = await HeroContent.findByIdAndUpdate(
//         _id,
//         { title_one, title_two, content },
//         { new: true }
//       );
//     } else {
//       console.log("got else ");
//       const hero = new HeroContent({ title_one, title_two, content });
//       await hero.save();
//     }
//     const data = await getDashboardData(user);
//     return res.render("../src/views/pages/dashboard.ejs", {
//       pageTitle: "Dashboard",
//       ...data,
//     });
//   } catch (err) {
//     console.log(err);
//     return;
//   }
// };

// export const createService = async (req, res) => {
//   const user = req.session.user;
//   const { title, description, _id } = req.body;
//   let icon;

//   if (!title || !description) {
//     return res.status(400).send("Title and description are required.");
//   }

//   try {
//     if (req.files && req.files.icon) {
//       const upload = req.files.icon;
//       icon = `uploads/${Date.now()}_${upload.name}`;

//       upload.mv(`public/${icon}`, async (err) => {
//         if (err) {
//           return res.status(500).send("File upload failed.");
//         }
//       });
//     }

//     if (_id) {
//       await ServiceContent.findByIdAndUpdate(
//         _id,
//         { icon, title, description },
//         { new: true }
//       );
//     } else {
//       const newService = new ServiceContent({ icon, title, description });
//       await newService.save();
//     }

//     const data = await getDashboardData(user);
//     res.render("../src/views/pages/dashboard.ejs", {
//       pageTitle: "Dashboard",
//       ...data,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error.");
//   }
// };

// export const deleteService = async (req, res) => {
//   const { _id } = req.body;
//   try {
//     const service = await ServiceContent.findById(_id);

//     if (!service) {
//       return res.status(404).send("Service not found.");
//     }
//     if (service.icon) {
//       fs.unlinkSync(`public/${service.icon}`);
//     }
//     await ServiceContent.findByIdAndDelete(_id);
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send("Internal server error.");
//   }
// };

// export const createObject = async (req, res) => {};

// export const deleteObject = async (req, res) => {};
