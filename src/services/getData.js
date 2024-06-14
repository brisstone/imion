import HeroContent from "../models/HeroContent.model.js";
import ServiceContent from "../models/ServiceContent.model.js";
import ObjectiveContent from "../models/ObjectiveContent.model.js";
import { servicesData } from "../data/servicesData.js";
import { objectiveData } from "../data/objectiveData.js";
import TrusteeContent from "../models/TrusteeContent.model.js";

import { trusteeData } from "../data/trusteeData.js";
import { governingData } from "../data/governingData.js";
import GoverningContent from "../models/GoverningContent.mode.js";

export const getData = async () => {
  try {
    const heroContent = await HeroContent.findOne({}).limit(1);
    const services = await ServiceContent.find({});
    const objectives = await ObjectiveContent.find({});
    const trustees = await TrusteeContent.find({});
    const governing = await GoverningContent.find({});

    const serviceContent = services.length > 0 ? services : servicesData;
    const objectiveContent = objectives.length > 0 ? objectives : objectiveData;
    const trusteeContent = trustees.length > 0 ? trustees : trusteeData;
    const governingContent = governing.length > 0 ? governing : governingData;

    return {
      heroContent,
      serviceContent,
      objectiveContent,
      trusteeContent,
      governingContent,
    };
  } catch (error) {
    console.log(error);
  }
};
