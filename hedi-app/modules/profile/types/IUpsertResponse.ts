import { IAPIResponse } from "@/modules/model";
import { IProfile } from "./IProfile";
import { UserProfileInput } from "./UserProfile";
import { IOrganisation } from "./IOrganisation";
import { IPersonal } from "./IPersonal";
import { IProfessional } from "./IProfessional";
import { IMidwife } from "./IMidwife";

export interface IUpsertProfileResponse<
  T extends IProfile | UserProfileInput | IOrganisation
> extends IAPIResponse<T> {
  data: T;
  route?: string;
}

export type IUpsertPersonalResponse = IUpsertProfileResponse<IPersonal>;

export type IUpsertProfessionalResponse = IUpsertProfileResponse<IProfessional>;

export type IUpsertMidwifeResponse = IUpsertProfileResponse<IMidwife>;

export type IUpsertOrganisationResponse = IUpsertProfileResponse<IOrganisation>;
