import { IWithType, IMutationResponse } from "@/modules/model";

export interface IPregnancy extends IWithType {
  route: string;
  expectedDeliveryDate: string;
  multiplePregnancy?: boolean;

  gravida: number;
  para: number;
  prevPrematureBirth?: boolean;
  prevBirthComplication?: boolean;
  prevCSection?: boolean;
  prevPostpartumDepression?: boolean;
  prevBreastfeedingProblem?: boolean;
}

export type IPregnancyEntry = IPregnancy;

export const PregnancyTypeName = "Pregnancy";

export function isIPregnancy(obj: any): obj is IPregnancy {
  return obj && obj?.type === PregnancyTypeName;
}

export type IPregnancyInput = Partial<Omit<IPregnancy, "type" | "route">>;

export const PregnancyInputDefault: IPregnancyInput = {
  expectedDeliveryDate: undefined,
  multiplePregnancy: false,
  gravida: 0,
  para: 0,
};

export function pregnancyToInput(pregnancy: IPregnancy): IPregnancyInput {
  const { type, route, ...pregnancyData } = pregnancy;
  return pregnancyData;
}

export interface IUpsertPregnancyResponse extends IMutationResponse {
  pregnancy?: IPregnancy;
}
