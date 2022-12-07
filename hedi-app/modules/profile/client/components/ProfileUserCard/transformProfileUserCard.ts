import {
  IProfessionalProfile,
  MidwifeTypeNameString,
  PersonalTypeNameString,
  UserProfile,
} from "@/modules/profile/types";
import { isBusinessProfileType } from "../Profile/profileTypesHelper";

export const transformProfileUserCard = (profile: UserProfile | null) => {
  const givenName = profile?.givenName ?? null;
  const familyName = profile?.familyName ?? null;
  const namePrefix = profile?.namePrefix ?? null;
  const postalCode = profile?.addresses?.[0]?.postalCode ?? null;
  const city = profile?.addresses?.[0]?.city ?? null;
  const compositeCity =
    postalCode === null && city === null ? "-" : `${postalCode} ${city}`;
  const street = profile?.addresses?.[0]?.street ?? null;
  const streetNumber = profile?.addresses?.[0]?.streetNumber ?? null;
  const compositeStreet =
    street === null && streetNumber === null
      ? "-"
      : `${street !== null ? street : ""} ${
          streetNumber !== null ? streetNumber : ""
        }`;

  const compositeName =
    givenName === null && familyName === null
      ? "-"
      : `${givenName !== null ? givenName : ""}${
          familyName !== null ? ` ${familyName}` : ""
        }${namePrefix !== null ? ` (${namePrefix})` : ""}`;

  const email = profile?.emails?.[0]?.email ?? null;
  const emailVisibilityIndex = profile?.emails?.[0]?.dataVisibility?.index ?? 0;
  const compositeEmail = email === null ? "-" : email;
  const phone = profile?.phones?.[0]?.phone ?? null;
  const compositePhone = phone === null ? "-" : phone;
  const businessProfile = profile as IProfessionalProfile;
  const website = businessProfile?.websites?.[0]?.website ?? null;
  const compositeWebsite = website === null ? "-" : website;
  const image = profile?.image || null;

  const isUserTileTwoEmpty: boolean =
    email === null && phone === null && website === null;

  const consultationHours = businessProfile?.consultationHours ?? null;

  const isUserTileThreeEmpty: boolean =
    !consultationHours || consultationHours.length === 0;

  const isUserTileFourEmpty: boolean = image === null;
  const isPersonalProfile = profile?.type === PersonalTypeNameString;
  const isMidwifeProfile = profile?.type === MidwifeTypeNameString;
  const isBusinessProfile = profile && isBusinessProfileType(profile?.type);
  return {
    compositeName,
    compositeCity,
    compositeStreet,
    compositeEmail,
    compositePhone,
    compositeWebsite,
    isUserTileTwoEmpty,
    isUserTileThreeEmpty,
    isUserTileFourEmpty,
    consultationHours,
    image,
    isBusinessProfile,
    isPersonalProfile,
    isMidwifeProfile,
    givenName,
    familyName,
    city,
    postalCode,
    namePrefix,
    street,
    streetNumber,
    email,
    website,
    phone,
    emailVisibilityIndex,
  };
};
