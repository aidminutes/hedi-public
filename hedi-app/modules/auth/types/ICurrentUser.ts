import { IImage } from "@/modules/media/types";

export interface ICurrentUser {
  preferredUserName?: string;
  givenName?: string;
  familyName?: string;
  image?: IImage;
  email: string;
}

export const CURRENT_USER_SWR_KEY = "Current_Active_User";
