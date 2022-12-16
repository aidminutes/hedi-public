import {
  IWebsite,
  IWebsiteInput,
  websiteToInput,
  IConsultationHour,
  IConsultationHourInput,
  consultationHourToInput,
} from "./dataTypes";
import { IProfession, IService } from "./taxonomyTypes";
import { IProfile, IProfileInput, profileToInput } from "./IProfile";
import { OrganisationTypeName } from "./IOrganisation";
import { ProfessionalProfileType } from "./IProfessionalProfile";

export type BusinessProfileType =
  | ProfessionalProfileType
  | OrganisationTypeName;

export interface IBusinessProfile extends IProfile {
  websites: IWebsite[];
  consultationHours: IConsultationHour[];
  profession: IProfession;
  services: IService[];
}

export function isIBusinessProfile(obj: any): obj is IBusinessProfile {
  return (
    obj &&
    !!obj.type &&
    (obj as IBusinessProfile).websites &&
    (obj as IBusinessProfile).consultationHours &&
    (obj as IBusinessProfile).profession &&
    (obj as IBusinessProfile).services
  );
}

export interface IBusinessProfileInput extends IProfileInput {
  websites: IWebsiteInput[];
  consultationHours: IConsultationHourInput[];
  profession: string;
  services: string[];
}

export function businessProfileToInput(
  businessProfile: IBusinessProfile
): IBusinessProfileInput {
  const {
    websites,
    consultationHours,
    profession,
    services,
    ...profile
  } = businessProfile;
  return {
    websites: websites.map(websiteToInput),
    consultationHours: consultationHours.map(consultationHourToInput),
    profession: profession.route,
    services: services.map(s => s.route),
    ...profileToInput(profile),
  };
}
