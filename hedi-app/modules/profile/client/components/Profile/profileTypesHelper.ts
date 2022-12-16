import {
  BusinessProfileType,
  MidwifeTypeNameString,
  OrganisationTypeNameString,
  ProfessionalTypeNameString,
} from "@/modules/profile/types";

export const getBusinessProfileType = (
  profileType: string
): BusinessProfileType | undefined =>
  isBusinessProfileType(profileType) ? profileType : undefined;

export const isBusinessProfileType = (
  profileType: string
): profileType is BusinessProfileType =>
  profileType === OrganisationTypeNameString ||
  profileType === MidwifeTypeNameString ||
  profileType === ProfessionalTypeNameString;
