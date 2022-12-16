import { CareType } from "@/modules/networking/types/ICareType";

export const transformCareTypeToRoute = (careType: CareType) =>
  "/profilecaretype/" + careType.toLowerCase();
