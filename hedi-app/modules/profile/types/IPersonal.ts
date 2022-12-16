import { dateToString } from "@/modules/common/utils";
import { IProfileInput, profileToInput } from "./IProfile";
import { IUserProfile, IUserProfileInput } from "./IUserProfile";

export interface IPersonal extends IUserProfile {
  birthDate?: Date;
}

export type PersonalTypeName = "Personal";
export const PersonalTypeNameString: PersonalTypeName = "Personal";

export function isIPersonal(obj: any): obj is IPersonal {
  return obj && obj?.type === PersonalTypeNameString;
}

export interface IPersonalInput extends IUserProfileInput {
  birthDate?: string;
}

export const PersonalInputDefault: IPersonalInput = {
  givenName: "",
  birthDate: "01-01-1990",
  addresses: [],
  phones: [],
  emails: [],
  languageLevels: [],
};

export interface IPersonalProfileDistinguisher {
  personalContext?: Boolean;
}

export function personalToInput(personal: IPersonal): IPersonalInput {
  if (!personal) return PersonalInputDefault;
  const { namePrefix, givenName, familyName, birthDate, ...profile } = personal;
  return {
    namePrefix,
    givenName,
    familyName,
    birthDate: dateToString(birthDate, "d.m.Y"),
    ...profileToInput(profile),
  };
}
