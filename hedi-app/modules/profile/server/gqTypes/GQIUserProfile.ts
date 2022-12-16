import { GQString } from "@/modules/graphql/server/gq-ts";
import { GQIProfile } from "./GQIProfile";
import { IUserProfile } from "../../types/IUserProfile";

export const GQIUserProfile: IUserProfile = {
  ...GQIProfile,
  namePrefix: GQString,
  givenName: GQString,
  familyName: GQString,
};
