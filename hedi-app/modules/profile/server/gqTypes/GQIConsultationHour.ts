import { GQString } from "@/modules/graphql/server/gq-ts";
import { IConsultationHour } from "../../types";
import { GQAvailability, GQWeekday } from "./GQProfileTaxonomyTypes";

export const GQIConsultationHour: IConsultationHour = {
  weekday: GQWeekday,
  startTime: GQString,
  endTime: GQString,
  availability: GQAvailability,
};
