import { aboutData } from "../data/aboutData.js";
import { contactInfoContent } from "../data/contactForm.js";
import { departmentData } from "../data/departmentData.js";
import { factsData } from "../data/factData.js";
import { governingData } from "../data/governingData.js";
import { heroData } from "../data/heroData.js";
import { objectiveData } from "../data/objectiveData.js";
import { servicesData } from "../data/servicesData.js";
import { trusteeData } from "../data/trusteeData.js";
import { upcomingEvents } from "../data/upcomingEventsData.js";
import AboutContent from "../models/AboutContent.model.js";
import ContactInfoContent from "../models/ContactInfoContent.model.js";
import DepartmentContent from "../models/DepartmentContent.model.js";
import FactContent from "../models/FactContent.model.js";
import GalleryContent from "../models/GalleryContent.model.js";
import GoverningContent from "../models/GoverningContent.mode.js";
import HeroContent from "../models/HeroContent.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";
import ServiceContent from "../models/ServiceContent.model.js";
import SocialMediaContent from "../models/SocialMediaContent.model.js";
import TrusteeContent from "../models/TrusteeContent.model.js";
import UpcomingEventContent from "../models/UpcomingEventContent.model.js";

export const seed = async (req, res) => {
  try {
    await trusteeSeeder();
    await governingSeeder();
    await gallerySeeder();
    await serviceSeeder();
    await objectiveSeeder();
    await socialSeeder();
    await departmentSeeder();
    await aboutSeeder();
    await eventSeeder();
    await heroSeeder();
    await factSeeder();
    await contactSeeder();
    return res.status(200).json("seeding success");
  } catch (error) {
    console.log(error);
  }
};

const trusteeSeeder = async () => {
  try {
    await TrusteeContent.deleteMany({});

    const trustees = await TrusteeContent.create(trusteeData);
    console.log(`Seeded ${trustees.length} trustees successfully.`);
  } catch (error) {
    console.error("Error seeding trustees:", error);
  }
};

const governingSeeder = async () => {
  try {
    await GoverningContent.deleteMany({});
    const seed = await GoverningContent.create(governingData);
    console.log(`Seeded ${seed.length} governing successfully.`);
  } catch (error) {
    console.error("Error seeding trustees:", error);
  }
};

const gallerySeeder = async () => {
  const length = 42;
  await GalleryContent.deleteMany({});
  for (let i = 1; i <= length; i++) {
    const img = `uploads/gallery/ga_${i.toString().padStart(2, "0")}.jpg`;
    const newView = new GalleryContent({ url: img });
    await newView.save();
  }
  console.log(`seeding ${42} gallery successful`);
};

const serviceSeeder = async () => {
  try {
    await ServiceContent.deleteMany({});
    const seed = await ServiceContent.create(servicesData);
    console.log(`Seeded ${seed.length} service successfully.`);
  } catch (error) {
    console.error("Error seeding service :", error);
  }
};

const objectiveSeeder = async () => {
  try {
    await ObjectiveContent.deleteMany({});
    const seed = await ObjectiveContent.create(objectiveData);
    console.log(`Seeded ${seed.length} objectives successfully.`);
  } catch (error) {
    console.error("Error seeding objective :", error);
  }
};

const aboutSeeder = async () => {
  try {
    await AboutContent.deleteMany({});
    const seed = await AboutContent.create(aboutData);
    console.log(`Seeded ${seed.length} about successfully.`);
  } catch (error) {
    console.error("Error seeding about :", error);
  }
};

const departmentSeeder = async () => {
  try {
    await DepartmentContent.deleteMany({});
    const seed = await DepartmentContent.create(departmentData);
    console.log(`Seeded ${seed.length} department successfully.`);
  } catch (error) {
    console.error("Error seeding department :", error);
  }
};

const eventSeeder = async () => {
  try {
    await UpcomingEventContent.deleteMany({});
    const seed = await UpcomingEventContent.create(upcomingEvents);
    console.log(`Seeded ${seed.length} event successfully.`);
  } catch (error) {
    console.error("Error seeding event :", error);
  }
};

const factSeeder = async () => {
  try {
    await FactContent.deleteMany({});
    const seed = await FactContent.create(factsData);
    console.log(`Seeded ${seed.length} fact successfully.`);
  } catch (error) {
    console.error("Error seeding fact :", error);
  }
};

const contactSeeder = async () => {
  try {
    await ContactInfoContent.deleteMany({});
    const seed = await ContactInfoContent.create(contactInfoContent);
    console.log(`Seeded ${seed.length} contact successfully.`);
  } catch (error) {
    console.error("Error seeding contact :", error);
  }
};

const heroSeeder = async () => {
  try {
    await HeroContent.deleteMany({});
    const seed = await HeroContent.create(heroData);
    console.log(`Seeded ${seed.length} hero successfully.`);
  } catch (error) {
    console.error("Error seeding hero :", error);
  }
};

const socialSeeder = async () => {
  try {
    await SocialMediaContent.deleteMany({});
    const seed = await SocialMediaContent.create([
      { url: "http", name: "twitter" },
      { url: "http", name: "facebook" },
      { url: "http", name: "youtube" },
      { url: "http", name: "instagram" },
    ]);
    console.log(`Seeded ${seed.length} social successfully.`);
  } catch (error) {
    console.error("Error seeding social :", error);
  }
};
