import { CareType } from "@/modules/networking/types/ICareType";

export const CareTypeToServiceMap: Record<CareType, string> = {
  prenatalCare: "schwangerschaftsvorsorge",
  deliveryCare: "geburtsbegleitung",
  postpartumCare: "wochenbettbetreuung",
};
