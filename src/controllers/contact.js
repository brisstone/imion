import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ContactInfoContent from "../models/ContactInfoContent.model.js";
import { renderDashboard } from "./dashboard.js";
dotenv.config();

export const contactUs = async (req, res) => {
  try {
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const { name, email, message, subject } = req.body;

    let mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: subject,
      text: message,
      html: "<b>From IMION!</b>",
    };

    await transporter.sendMail(mailOptions);
    return res.status(200);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
export const createContactInfo = async (req, res) => {
  const user = req.session.user;
  try {
    const { name, email, address, url, _id } = req.body;
    if (_id !== "") {
      await ContactInfoContent.findByIdAndUpdate(
        id,
        { name, email, address, url },
        { new: true }
      );
    } else {
      const newContactInfoContent = new ContactInfoContent({
        name,
        email,
        address,
        url,
      });
      await newContactInfoContent.save();
    }
    await renderDashboard(res, user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteContactInfo = async (req, res) => {
  const user = req.session.user;
  try {
    const { _id } = req.body;
    const deletedContactInfoContent =
      await ContactInfoContent.findByIdAndDelete(_id);

    if (!deletedContactInfoContent) {
      return res.status(404).json({ error: "Contact info content not found" });
    }
    await renderDashboard(res, user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
