import GalleryContent from "../models/GalleryContent.model.js";
import { getData } from "../services/getData.js";
import fs from "fs";

export const renderDashboard = async (res, user) => {
  try {
    const data = await getData();
    return res.render("../src/views/pages/dashboard-gallery.ejs", {
      pageTitle: "Dashboard Gallery",
      ...data,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error.");
  }
};

export const dashboardGallery = async (req, res) => {
  const user = req.session.user;
  try {
    await renderDashboard(res, user);
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
};

export const addGalleryImage = async (req, res) => {
  const user = req.session.user;
  let img;
  try {
    if (req.files && req.files.image) {
      const upload = req.files.image;
      img = `uploads/gallery/${Date.now()}_${upload.name}`;
      await new Promise((resolve, reject) => {
        upload.mv(`public/${img}`, (err) => {
          if (err) {
            reject(new Error("File upload failed."));
          } else {
            resolve();
          }
        });
      });
    }
    const newView = new GalleryContent({ url: img });
    await newView.save();

    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const deleteGalleryImage = async (req, res) => {
  const user = req.session.user;
  const { _id, url } = req.body;
  try {
    await fs.unlinkSync(`public/${url}`);
    await GalleryContent.findByIdAndDelete(_id);
    await renderDashboard(res, user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const gallerySeeder = async (req, res) => {
  const length = 42;
  for (let i = 1; i <= length; i++) {
    const img = `uploads/gallery/ga_${i.toString().padStart(2, "0")}.jpg`;
    const newView = new GalleryContent({ url: img });
    await newView.save();
  }
  return res.status(200).json("seeding success");
};
