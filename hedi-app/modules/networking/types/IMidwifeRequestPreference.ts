import { IMutationResponse, IWithType } from "@/modules/model";

export interface IMidwifeRequestPreference extends IWithType {
  route: string;
  searchable: boolean;
  radius?: number;
  defaultCapacity?: number;
  anonymousRequest: boolean;
  directCareRequest: boolean;
}

export const MidwifeRequestPreferenceTypeName = "MidwifeRequestPreference";

export function isIMidwifeRequestPreference(
  obj: any
): obj is IMidwifeRequestPreference {
  return obj && obj?.type === MidwifeRequestPreferenceTypeName;
}

export type IMidwifeRequestPreferenceInput = Partial<
  Omit<IMidwifeRequestPreference, "type" | "route">
>;

export const MidwifeRequestPreferenceInputDefault: IMidwifeRequestPreferenceInput = {
  searchable: false,
  radius: 1,
  defaultCapacity: 0,
  anonymousRequest: false,
  directCareRequest: false,
};

export function midwifeRequestPreferenceToInput(
  midwifeRequestPreference: IMidwifeRequestPreference
): IMidwifeRequestPreferenceInput {
  const {
    type,
    route,
    ...midwifeRequestPreferenceData
  } = midwifeRequestPreference;
  return midwifeRequestPreferenceData;
}

export interface IUpsertMidwifeRequestPreferenceResponse
  extends IMutationResponse {
  data?: IMidwifeRequestPreference;
}
