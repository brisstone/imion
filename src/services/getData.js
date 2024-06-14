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

export const getData = async () => {
  try {
    const heros = await HeroContent.find({}).limit(1);
    const services = await ServiceContent.find({});
    const objectives = await ObjectiveContent.find({});
    const trustees = await TrusteeContent.find({});
    const governing = await GoverningContent.find({});
    const facts = await FactContent.find({});

    const serviceContent = services.length > 0 ? services : servicesData;
    const objectiveContent = objectives.length > 0 ? objectives : objectiveData;
    const trusteeContent = trustees.length > 0 ? trustees : trusteeData;
    const governingContent = governing.length > 0 ? governing : governingData;
    const factContent = facts.length > 0 ? facts : factsData;
    const heroContent = heros.length > 0 ? heros : heroData;

    return {
      heroContent,
      serviceContent,
      objectiveContent,
      trusteeContent,
      governingContent,
      factContent,
    };
  } catch (error) {
    console.log(error);

    return {
      heroContent,
      serviceContent,
      objectiveContent,
      trusteeContent,
      governingContent,
      factContent,
    };
  }
};
