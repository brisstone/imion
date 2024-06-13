import HeroContent from "../models/HeroContent.model.js";
import ServiceContent from "../models/ServiceContent.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";
import { servicesData } from "../data/servicesData.js";
import { objectiveData } from "../data/objectiveData.js";

export const getData = async () => {
  try {
    const heroContent = await HeroContent.findOne({}).limit(1);
    const services = await ServiceContent.find({});
    const objectives = await ObjectiveContent.find({});

    const serviceContent = services.length > 0 ? services : servicesData;
    const objectiveContent = objectives.length > 0 ? objectives : objectiveData;

    return {
      heroContent,
      serviceContent,
      objectiveContent,
    };
  } catch (error) {
    console.log(error);
  }
};
