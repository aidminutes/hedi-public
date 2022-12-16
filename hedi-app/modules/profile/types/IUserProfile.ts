import { IProfile, IProfileInput } from "./IProfile";

export interface IUserProfile extends IProfile {
  namePrefix?: string;
  givenName: string;
  familyName?: string;
}

export interface IUserProfileInput extends IProfileInput {
  namePrefix?: string;
  givenName: string;
  familyName?: string;
}

export const UserProfileInputDefault: IUserProfileInput = {
  givenName: "",
  addresses: [],
  phones: [],
  emails: [],
  languageLevels: [],
};
