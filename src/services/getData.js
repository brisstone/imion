import HeroContent from "../models/HeroContent.model.js";
import ServiceContent from "../models/ServiceContent.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";
import { servicesData } from "../data/servicesData.js";
import { objectiveData } from "../data/objectiveData.js";
import TrusteeContent from "../models/TrusteeContent.model.js";
import { trusteeData } from "../data/trusteeData.js";
import { governingData } from "../data/governingData.js";
import GoverningContent from "../models/GoverningContent.mode.js";
import FactContent from "../models/FactContent.model.js";
import { factsData } from "../data/factData.js";
import { heroData } from "../data/heroData.js";
import { contactInfoContent } from "../data/contactForm.js";
import ContactInfoContent from "../models/ContactInfoContent.model.js";
import { upcomingEvents } from "../data/upcomingEventsData.js";
import UpcomingEventContent from "../models/UpcomingEventContent.model.js";
import { aboutData } from "../data/aboutData.js";
import AboutContent from "../models/AboutContent.model.js";
import HomeVideo from "../models/HomeVideo.model.js";
import GalleryContent from "../models/GalleryContent.model.js";
import Logo from "../models/LogoContent.model.js";
import DepartmentContent from "../models/DepartmentContent.model.js";
import { departmentData } from "../data/departmentData.js";
import SocialMediaContent from "../models/SocialMediaContent.model.js";

export const getData = async () => {
  try {
    const heros = await HeroContent.find({}).limit(1);
    const services = await ServiceContent.find({});
    const objectives = await ObjectiveContent.find({});
    const trustees = await TrusteeContent.find({});
    const governing = await GoverningContent.find({});
    const facts = await FactContent.find({}).limit(1);
    const info = await ContactInfoContent.find({}).limit(1);
    const events = await UpcomingEventContent.find({});
    const about = await AboutContent.find({}).limit(1);
    const video = await HomeVideo.find({}).limit(1);
    const galleries = await GalleryContent.find({}).sort({ createdAt: -1 });
    const logos = await Logo.find({}).limit(1);
    const department = await DepartmentContent.find({}).limit(1);
    const socials = await SocialMediaContent.find({});

    const aboutTopContent = about.length > 0 ? about : aboutData;
    const serviceContent = services.length > 0 ? services : servicesData;
    const objectiveContent = objectives.length > 0 ? objectives : objectiveData;
    const trusteeContent = trustees.length > 0 ? trustees : trusteeData;
    const governingContent = governing.length > 0 ? governing : governingData;
    const factContent = facts.length > 0 ? facts : factsData;
    const heroContent = heros.length > 0 ? heros : heroData;
    const InfoContent = info.length > 0 ? info : contactInfoContent;
    const upcomingEventsContent = events.length > 0 ? events : upcomingEvents;
    const departmentContent =
      department.length > 0 ? department : departmentData;

    const videoContent =
      video.length > 0 ? video : [{ url: "/assets//videos/videpo_22.mp4" }];

    const galleryContent =
      galleries.length > 0
        ? galleries
        : [
            { url: "uploads/gallery/ga_41.jpg" },
            { url: "uploads/gallery/ga_42.jpg" },
          ];
    const logoContent =
      logos.length > 0 ? logos : [{ url: "assets/images/logoNew.png" }];
    const socialContent =
      socials.length > 0
        ? socials
        : [
            { url: "http", name: "twitter" },
            { url: "http", name: "facebook" },
            { url: "http", name: "youtube" },
            { url: "http", name: "instagram" },
          ];
    return {
      heroContent,
      serviceContent,
      objectiveContent,
      trusteeContent,
      governingContent,
      factContent,
      InfoContent,
      upcomingEventsContent,
      aboutTopContent,
      videoContent,
      galleryContent,
      logoContent,
      departmentContent,
      socialContent,
    };
  } catch (error) {
    console.log(error);
  }
};
