import {
  IBusinessProfile,
  IBusinessProfileInput,
  businessProfileToInput,
} from "./IBusinessProfile";
import { IUserProfile, IUserProfileInput } from "./IUserProfile";
import {
  ProfessionalTypeName,
  ProfessionalTypeNameString,
} from "./IProfessional";
import { MidwifeTypeName, MidwifeTypeNameString } from "./IMidwife";

export type ProfessionalProfileType = ProfessionalTypeName | MidwifeTypeName;

export interface IProfessionalProfile extends IBusinessProfile, IUserProfile {
  organisations: IBusinessProfile[];
}

export function isIProfessionalProfile(obj: any): obj is IProfessionalProfile {
  return obj && !!obj.type && isProfessionalProfileType(obj.type);
}

export function isProfessionalProfileType(
  type: string
): type is ProfessionalProfileType {
  const businessProfileTypeNames: string[] = [
    ProfessionalTypeNameString,
    MidwifeTypeNameString,
  ];
  return businessProfileTypeNames.includes(type);
}

export interface IProfessionalProfileInput
  extends IBusinessProfileInput,
    IUserProfileInput {}

export function professionalProfileToInput(
  profile: IProfessionalProfile
): IProfessionalProfileInput {
  const { namePrefix, givenName, familyName, ...businessProfile } = profile;
  return {
    namePrefix,
    givenName,
    familyName,
    ...businessProfileToInput(businessProfile),
  };
}
