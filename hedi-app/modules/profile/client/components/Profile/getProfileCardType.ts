import {
  MidwifeTypeNameString,
  OrganisationTypeNameString,
  ProfessionalTypeNameString,
} from "@/modules/profile/types";
import { ProfileCardType } from "../ProfileCard";

export const getProfileCardType = (profileType: string) =>
  profileType === OrganisationTypeNameString
    ? ProfileCardType.ORGANISATION
    : profileType === ProfessionalTypeNameString ||
      profileType === MidwifeTypeNameString
    ? ProfileCardType.PROFESSIONAL
    : ProfileCardType.PERSONAL;
