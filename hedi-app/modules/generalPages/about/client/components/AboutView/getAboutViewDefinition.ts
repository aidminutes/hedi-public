import {
  findImageInstance,
  getBodyInstance,
  getButtonInstance,
  getLabelInstance,
  IBodyComponent,
  IButtonComponent,
  IComponent,
  IImageComponent,
  ILabelComponent,
} from "@/modules/components";

export interface AboutViewDefinition {
  headline: ILabelComponent;
  introText: IBodyComponent;
  introImage: IImageComponent;
  roadmapHeadline: ILabelComponent;
  roadmapIntroText: IBodyComponent;
  roadmapWinter21Image?: IImageComponent;
  roadmapWinter21Text: IBodyComponent;
  roadmapSpring22Image?: IImageComponent;
  roadmapSpring22Text: IBodyComponent;
  roadmapSummer22Image?: IImageComponent;
  roadmapSummer22Text: IBodyComponent;
  roadmapFall22Image?: IImageComponent;
  roadmapFall22Text: IBodyComponent;
  targetgroupHeadline: ILabelComponent;
  targetgroupSubheadline: ILabelComponent;
  targetgroupMothersImage?: IImageComponent;
  targetgroupMothersText: IBodyComponent;
  targetgroupMidwivesImage?: IImageComponent;
  targetgroupMidwivesText: IBodyComponent;
  targetgroupDoctorsImage?: IImageComponent;
  targetgroupDoctorsText: IBodyComponent;
  targetgroupSectionEndImage?: IImageComponent;
  contributionHeadline: ILabelComponent;
  contributionText: IBodyComponent;
  contactHediButton: IButtonComponent;
  creditsHeadline: ILabelComponent;
  creditsText: IBodyComponent;
  creditsPeopleColumnOne: IBodyComponent;
  creditsPeopleColumnTwo: IBodyComponent;
  teamHeadline: ILabelComponent;
  teamText: IBodyComponent;
  teamImage?: IImageComponent;
  logosColumnOne?: IImageComponent;
  logosColumnTwo?: IImageComponent;
  imageEULogo?: IImageComponent;
  imageLowerSaxonyEU?: IImageComponent;
}

export const getAboutViewDefinition = (components: IComponent[]) => {
  return {
    headline: getLabelInstance(components, "headline", { labelKind: "h1" }),
    introText: getBodyInstance(components, "introText", {}),
    introImage: findImageInstance(components, "introImage"),
    roadmapHeadline: getLabelInstance(components, "roadmapHeadline", {
      labelKind: "h1",
    }),
    roadmapIntroText: getBodyInstance(components, "roadmapIntroText", {}),
    roadmapWinter21Image: findImageInstance(components, "roadmapWinter21Image"),
    roadmapWinter21Text: getBodyInstance(components, "roadmapWinter21Text", {}),
    roadmapSpring22Image: findImageInstance(components, "roadmapSpring22Image"),
    roadmapSpring22Text: getBodyInstance(components, "roadmapSpring22Text", {}),
    roadmapSummer22Image: findImageInstance(components, "roadmapSummer22Image"),
    roadmapSummer22Text: getBodyInstance(components, "roadmapSummer22Text", {}),
    roadmapFall22Image: findImageInstance(components, "roadmapFall22Image"),
    roadmapFall22Text: getBodyInstance(components, "roadmapFall22Text", {}),
    targetgroupHeadline: getLabelInstance(components, "targetgroupHeadline", {
      labelKind: "h1",
    }),
    targetgroupSubheadline: getLabelInstance(
      components,
      "targetgroupSubheadline",
      { labelKind: "h1" }
    ),
    targetgroupMothersHeadline: getLabelInstance(
      components,
      "targetgroupMothersHeadline",
      {
        labelKind: "h3",
      }
    ),
    targetgroupMothersImage: findImageInstance(
      components,
      "targetgroupMothersImage"
    ),
    targetgroupMothersText: getBodyInstance(
      components,
      "targetgroupMothersText",
      {}
    ),
    targetgroupMidwivesImage: findImageInstance(
      components,
      "targetgroupMidwivesImage"
    ),
    targetgroupMidwivesHeadline: getLabelInstance(
      components,
      "targetgroupMidwivesHeadline",
      {
        labelKind: "h3",
      }
    ),
    targetgroupMidwivesText: getBodyInstance(
      components,
      "targetgroupMidwivesText",
      {}
    ),
    targetgroupDoctorsImage: findImageInstance(
      components,
      "targetgroupDoctorsImage"
    ),
    targetgroupDoctorsHeadline: getLabelInstance(
      components,
      "targetgroupDoctorsHeadline",
      {
        labelKind: "h3",
      }
    ),
    targetgroupDoctorsText: getBodyInstance(
      components,
      "targetgroupDoctorsText",
      {}
    ),
    targetgroupSectionEndImage: findImageInstance(
      components,
      "targetgroupSectionEndImage"
    ),
    contributionHeadline: getLabelInstance(components, "contributionHeadline", {
      labelKind: "h1",
    }),
    contributionText: getBodyInstance(components, "contributionText", {}),
    contactHediButton: getButtonInstance(components, "contactHediButton", {
      buttonKind: "primary",
      text: "HEDI kontaktieren",
      usage: "Contact button",
    }),
    creditsHeadline: getLabelInstance(components, "creditsHeadline", {
      labelKind: "h1",
    }),
    creditsText: getBodyInstance(components, "creditsText", {}),
    creditsPeopleColumnOne: getBodyInstance(
      components,
      "creditsPeopleColumnOne",
      {}
    ),
    creditsPeopleColumnTwo: getBodyInstance(
      components,
      "creditsPeopleColumnTwo",
      {}
    ),
    teamHeadline: getLabelInstance(components, "teamHeadline", {
      labelKind: "h1",
    }),
    teamImage: findImageInstance(components, "teamImage"),
    teamText: getBodyInstance(components, "teamText", {}),
    logosColumnOne: findImageInstance(components, "logosColumnOne"),
    logosColumnTwo: findImageInstance(components, "logosColumnTwo"),
    imageEULogo: findImageInstance(components, "imageEULogo"),
    imageLowerSaxonyEU: findImageInstance(components, "imageLowerSaxonyEU"),
    imageBfhdLogo: findImageInstance(components, "imageBfhdLogo"),
  };
};
